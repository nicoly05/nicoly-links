# Nicoly Andrade · Links

Página de links (link-in-bio) da Nicoly Andrade. Site estático, feito para abrir rápido no celular e publicar na Vercel sem configuração extra.

## Editar os links

Todo o conteúdo fica em [`src/links.json`](src/links.json).

- `profile` — nome, @, bio e caminhos das fotos. Na bio, separe cada trecho com ` | `.
- `links` — botões, na ordem em que aparecem.
- `socials` — ícones redondos do final da página.

Cada botão:

```json
{
  "label": "Texto do botão",
  "hint": "Linha menor, opcional",
  "href": "https://exemplo.com",
  "icon": "portfolio"
}
```

Ícones disponíveis: `portfolio`, `globe`, `camera`, `instagram`, `tiktok`, `link`.

Se o texto estiver em inglês, use `"labelLang": "en"` ou `"hintLang": "en"`.

Links externos abrem em uma nova aba (`rel="noopener"`).

Fotos:

- `public/avatar.jpg` — foto redonda do perfil
- `public/og.jpg` — imagem de compartilhamento (Open Graph)
- `public/favicon.svg` — ícone da aba

O visual fica em [`src/styles.css`](src/styles.css).

## Rodar no computador

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar (em geral http://localhost:5173).

Para gerar a versão final:

```bash
npm run build
npm run preview
```

## Publicar na Vercel

1. Entre em [vercel.com](https://vercel.com) e importe este repositório.
2. A Vercel reconhece o Vite sozinha. Não é preciso definir comando de build, pasta de saída nem variáveis.
3. Clique em Deploy.

As meta tags de compartilhamento usam o domínio de produção da Vercel automaticamente. Se o site usar um domínio próprio, defina `SITE_URL` no projeto (por exemplo `https://links.nicoly.com.br`).

Nenhum segredo é necessário. Não coloque tokens, senhas ou chaves neste repositório: ele é público.
