export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://piloteai.cl',
    name: 'Piloteai',
    description: 'Prepara tus exámenes DGAC con más de 10,000 preguntas reales organizadas por licencia y tema. Exámenes cronometrados, seguimiento de progreso y explicaciones detalladas.',
    defaultLocale: 'es-CL',
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    excludeAppSources: true,
    urls: async () => {
      const staticUrls = [
        { loc: '/', changefreq: 'weekly', priority: 1.0 },
        { loc: '/privacidad', changefreq: 'monthly', priority: 0.3 },
        { loc: '/soporte', changefreq: 'monthly', priority: 0.5 },
        { loc: '/acceder', changefreq: 'monthly', priority: 0.4 },
        { loc: '/licencias', changefreq: 'weekly', priority: 0.9 },
      ]

      const { getAllLicensePages, slugify } = await import('./data/curricula/index')
      const { getGuideByLicenseId } = await import('./data/guides/como-obtener')
      const licenses = getAllLicensePages()
      const dynamicUrls: { loc: string; changefreq: string; priority: number }[] = []

      for (const l of licenses) {
        dynamicUrls.push({ loc: `/licencias/${l.slug}`, changefreq: 'monthly', priority: 0.8 })
        for (const s of l.curriculum.subjects) {
          dynamicUrls.push({ loc: `/licencias/${l.slug}/${slugify(s.name)}`, changefreq: 'monthly', priority: 0.7 })
        }
        if (getGuideByLicenseId(l.slug)) {
          dynamicUrls.push({ loc: `/licencias/${l.slug}/como-obtener`, changefreq: 'monthly', priority: 0.8 })
        }
      }

      return [...staticUrls, ...dynamicUrls]
    },
  },

  robots: {
    disallow: [
      '/inicio',
      '/perfil',
      '/tutor',
      '/examenes',
      '/examen',
      '/leccion',
      '/licencia',
      '/bienvenida',
      '/pago',
      '/crear-contrasena',
      '/cambiar-contrasena',
      '/acceder/callback',
    ],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Piloteai',
      url: 'https://piloteai.cl',
      logo: 'https://piloteai.cl/icon.png',
    },
  },

  devServer: {
    host: '0.0.0.0',
    allowedHosts: ['tubes-injured-wanna-outcomes.trycloudflare.com'],
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID || '',
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0A1929' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap' },
      ],
    },
  },
})
