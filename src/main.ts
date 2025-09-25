import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@/assets/vendor/fontello-5a1bbd40/css/testsoruce.css'
import '@/assets/vendor/fontello-5a1bbd40/font/testsoruce.woff'
import { store } from '@/store/index'
import { VueTelegramPlugin } from 'vue-tg'
import { initYandexMetrika } from 'yandex-metrika-vue3';
import { YM_ID } from './utils/consts'
import * as Sentry from "@sentry/vue";

const app = createApp(App)
console.log();

Sentry.init({
    app,
    dsn: "https://d535db44d76082d4079bb430292d3743@o4510068522549248.ingest.de.sentry.io/4510074200522832",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [
        Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false
        })
    ],
    // Session Replay
    replaysSessionSampleRate: 0.4, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0,
    
});

app.use(router)
// @ts-expect-error
app.use(initYandexMetrika, {
    id: YM_ID.toString(),
    router: router,
    // @ts-expect-error
    env: process.env.NODE_ENV
    // other options
})
app.use(VueTelegramPlugin)
app.use(store)
app.mount('#app')
