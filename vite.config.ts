import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'html-env-fallback',
      transformIndexHtml: {
        order: 'post',
        handler(html: string) {
          const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')
          if (!siteUrl) {
            // Remove canonical link tag when site URL is not configured to avoid invalid relative URL error in SEO audit
            html = html.replace(/<link rel="canonical" href="%VITE_SITE_URL%\/?" \/>\s*/, '')
            return html.replaceAll('%VITE_SITE_URL%', '')
          }
          return html.replaceAll('%VITE_SITE_URL%', siteUrl)
        },
      },
    },
  ],
})
