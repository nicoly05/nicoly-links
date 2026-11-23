import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { linksPath, transformHtml } from './scripts/render-html.mjs'

function normalizeSiteUrl(value) {
  if (!value) return ''
  const trimmed = value.trim().replace(/\/$/, '')
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function resolveSiteUrl() {
  return (
    normalizeSiteUrl(process.env.SITE_URL) ||
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    normalizeSiteUrl(process.env.VERCEL_URL) ||
    ''
  )
}

const linksFile = fileURLToPath(new URL('./src/links.json', import.meta.url))

function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const cssNames = Object.keys(bundle).filter((name) => name.endsWith('.css'))
      if (cssNames.length === 0) return
      const css = cssNames
        .map((name) => {
          const text = bundle[name].source?.toString?.() ?? ''
          delete bundle[name]
          return text
        })
        .join('\n')
      const htmlName = Object.keys(bundle).find((name) => name.endsWith('.html'))
      if (!htmlName) return
      const html = bundle[htmlName].source.toString()
      bundle[htmlName].source = html.replace(
        /<link rel="stylesheet"[^>]*>/,
        () => `<style>${css}</style>`,
      )
    },
  }
}

export default defineConfig({
  plugins: [
    inlineCss(),
    {
      name: 'nicoly-links',
      transformIndexHtml: {
        order: 'pre',
        handler(html, ctx) {
          ctx?.server?.watcher.add(linksFile)
          return transformHtml(html, resolveSiteUrl())
        },
      },
      handleHotUpdate({ file, server }) {
        if (file === linksPath) {
          server.ws.send({ type: 'full-reload' })
        }
      },
    },
  ],
})
