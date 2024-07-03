// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png',
                },
                { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', sizes: '192x192', href: '/android-chrome-192x192.png' },
                { rel: 'icon', sizes: '512x512', href: '/android-chrome-512x512.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
            ],
        },
    },
    devtools: { enabled: true },
    compatibilityDate: '2024-07-03',
});
