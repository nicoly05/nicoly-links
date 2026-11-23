import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const linksPath = fileURLToPath(new URL('../src/links.json', import.meta.url))

const ICON_NAMES = ['portfolio', 'globe', 'camera', 'instagram', 'tiktok', 'link']

function stroke(inner) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`
}

function filled(path) {
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`
}

const ICONS = {
  portfolio: stroke(`
    <rect x="3.5" y="3.5" width="7.2" height="7.2" rx="1.6"/>
    <rect x="13.3" y="3.5" width="7.2" height="7.2" rx="1.6"/>
    <rect x="3.5" y="13.3" width="7.2" height="7.2" rx="1.6"/>
    <rect x="13.3" y="13.3" width="7.2" height="7.2" rx="1.6"/>
  `),
  globe: stroke(`
    <circle cx="12" cy="12" r="8.25"/>
    <path d="M3.8 12h16.4"/>
    <path d="M12 3.75c2.15 2.25 3.35 5.15 3.35 8.25s-1.2 6-3.35 8.25C9.85 18 8.65 15.1 8.65 12S9.85 6 12 3.75z"/>
  `),
  camera: stroke(`
    <path d="M4 8.25h2.7l1.15-1.9h8.3l1.15 1.9H20a1.5 1.5 0 0 1 1.5 1.5v8.1A1.5 1.5 0 0 1 20 19.35H4a1.5 1.5 0 0 1-1.5-1.5V9.75A1.5 1.5 0 0 1 4 8.25z"/>
    <circle cx="12" cy="13.6" r="3.05"/>
  `),
  link: stroke(`
    <path d="M10 13.5a4.2 4.2 0 0 0 6.4.45l1.7-1.7a4.2 4.2 0 0 0-5.94-5.94L11.1 7.4"/>
    <path d="M14 10.5a4.2 4.2 0 0 0-6.4-.45l-1.7 1.7a4.2 4.2 0 0 0 5.94 5.94l1.06-1.09"/>
  `),
  instagram: filled(
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  ),
  tiktok: filled(
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  ),
  arrow: stroke(`
    <path d="M7 17 17 7"/>
    <path d="M9 7h8v8"/>
  `),
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function readLinks() {
  let data
  try {
    data = JSON.parse(readFileSync(linksPath, 'utf8'))
  } catch (error) {
    throw new Error(`Não foi possível ler src/links.json (${error.message})`)
  }
  if (!data?.profile?.name || !data.profile.handle || !data.profile.bio) {
    throw new Error('src/links.json precisa de profile.name, profile.handle e profile.bio.')
  }
  if (!Array.isArray(data.links) || data.links.length === 0) {
    throw new Error('src/links.json precisa de pelo menos um item em links.')
  }
  for (const item of [...data.links, ...(data.socials ?? [])]) {
    validateLink(item)
  }
  return data
}

function validateLink(item) {
  const label = item?.label?.trim()
  if (!label) throw new Error('Todo link precisa de "label".')
  let url
  try {
    url = new URL(item.href)
  } catch {
    throw new Error(`O link "${label}" tem uma URL inválida.`)
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`O link "${label}" precisa usar http ou https.`)
  }
  if (item.icon && !ICONS[item.icon]) {
    throw new Error(`Ícone desconhecido "${item.icon}" em "${label}". Use: ${ICON_NAMES.join(', ')}.`)
  }
}

function bioParts(bio) {
  return String(bio)
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
}

function sentenceFromParts(parts) {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return `${parts.slice(0, -1).join(', ')} e ${parts.at(-1)}`
}

function absoluteUrl(siteUrl, path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (!siteUrl) return path
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

function jpegSize(filePath) {
  const buf = readFileSync(filePath)
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let offset = 2
  while (offset < buf.length - 8) {
    if (buf[offset] !== 0xff) break
    const marker = buf[offset + 1]
    const length = buf.readUInt16BE(offset + 2)
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
    if (isStartOfFrame) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      }
    }
    offset += 2 + length
  }
  return null
}

function publicFile(urlPath) {
  const relative = urlPath.replace(/^\//, '')
  return fileURLToPath(new URL(`../public/${relative}`, import.meta.url))
}

function langAttr(lang) {
  return lang ? ` lang="${escapeHtml(lang)}"` : ''
}

function renderAvatar(avatar, alt) {
  const size = jpegSize(publicFile(avatar))
  return `<img class="avatar" src="${escapeHtml(avatar)}" width="${size?.width ?? 320}" height="${size?.height ?? 320}" alt="${escapeHtml(alt)}" fetchpriority="high" decoding="async">`
}

function renderLink(link, index) {
  const icon = ICONS[link.icon || 'link']
  const hint = link.hint?.trim()
    ? `<span class="link-hint"${langAttr(link.hintLang)}>${escapeHtml(link.hint.trim())}</span>`
    : ''
  return `<a class="link" style="--i: ${index}" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">
        <span class="link-icon">${icon}</span>
        <span class="link-copy">
          <span class="link-label"${langAttr(link.labelLang)}>${escapeHtml(link.label.trim())}</span>
          ${hint}
          <span class="sr-only"> (abre em uma nova aba)</span>
        </span>
        <span class="link-go">${ICONS.arrow}</span>
      </a>`
}

function renderSocial(social) {
  const icon = ICONS[social.icon || 'link']
  return `<a class="social" href="${escapeHtml(social.href)}" target="_blank" rel="noopener noreferrer me">
        ${icon}
        <span class="sr-only">${escapeHtml(social.label.trim())} (abre em uma nova aba)</span>
      </a>`
}

function splitName(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return { first: name.trim(), last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

export function transformHtml(html, siteUrl = '') {
  const data = readLinks()
  const { profile } = data
  const parts = bioParts(profile.bio)
  const name = profile.name.trim()
  const handle = profile.handle.trim()
  const username = handle.replace(/^@/, '')
  const { first, last } = splitName(name)
  const description = `${sentenceFromParts(parts)}. Links de ${name} (${handle}).`
  const avatar = profile.avatar || '/avatar.jpg'
  const ogImagePath = profile.ogImage || avatar
  const ogImage = absoluteUrl(siteUrl, ogImagePath)
  const size = jpegSize(publicFile(ogImagePath))
  const pageUrl = siteUrl ? `${siteUrl}/` : ''
  const sameAs = [...new Set([...(data.links ?? []), ...(data.socials ?? [])].map((item) => item.href))]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    alternateName: handle,
    description,
    jobTitle: parts,
    image: absoluteUrl(siteUrl, ogImagePath),
    sameAs,
  }
  if (pageUrl) jsonLd.url = pageUrl

  const profileMeta = [
    `<meta property="profile:first_name" content="${escapeHtml(first)}">`,
    last ? `<meta property="profile:last_name" content="${escapeHtml(last)}">` : '',
    `<meta property="profile:username" content="${escapeHtml(username)}">`,
  ].filter(Boolean).join('\n  ')

  const profileHtml = `<header class="profile">
      <div class="avatar-ring">
        ${renderAvatar(avatar, `Foto de ${name}`)}
      </div>
      <h1 class="name">${escapeHtml(name)}</h1>
      <p class="handle">${escapeHtml(handle)}</p>
      <p class="bio">${escapeHtml(parts.join(' · '))}</p>
    </header>`

  const linksNav = `<nav class="links" aria-label="Links">
      ${data.links.map(renderLink).join('\n      ')}
    </nav>`

  const socials = data.socials ?? []
  const socialDelay = `${(0.28 + data.links.length * 0.06).toFixed(2)}s`
  const socialsNav = socials.length
    ? `<nav class="socials" aria-label="Redes sociais">
      ${socials.map(renderSocial).join('\n      ')}
    </nav>`
    : ''

  const replacements = {
    __TITLE__: escapeHtml(`${name} · Links`),
    __DESCRIPTION__: escapeHtml(description),
    __AUTHOR__: escapeHtml(name),
    __AVATAR__: escapeHtml(avatar),
    __CANONICAL__: pageUrl ? `<link rel="canonical" href="${escapeHtml(pageUrl)}">` : '',
    __OG_TITLE__: escapeHtml(name),
    __OG_IMAGE__: escapeHtml(ogImage),
    __OG_ALT__: escapeHtml(`Foto de ${name}`),
    __OG_W__: String(size?.width ?? ''),
    __OG_H__: String(size?.height ?? ''),
    __OG_URL__: pageUrl ? `<meta property="og:url" content="${escapeHtml(pageUrl)}">` : '',
    __PROFILE_META__: profileMeta,
    __JSONLD__: JSON.stringify(jsonLd).replaceAll('<', '\\u003c'),
    __PROFILE__: profileHtml,
    __LINKS_NAV__: linksNav,
    __SOCIALS_NAV__: socialsNav,
    __YEAR__: String(new Date().getFullYear()),
    __DELAY__: socialDelay,
  }

  let output = html
  for (const [token, value] of Object.entries(replacements)) {
    output = output.replaceAll(token, value)
  }
  const leftover = output.match(/__[A-Z0-9]+__/g)
  if (leftover) {
    throw new Error(`Tokens não substituídos: ${[...new Set(leftover)].join(', ')}`)
  }
  return output
}

export { linksPath, root }
