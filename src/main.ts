import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@/assets/vendor/fontello-5a1bbd40/css/testsoruce.css'
import '@/assets/vendor/fontello-5a1bbd40/font/testsoruce.woff'
import {store} from '@/store/index'
import { VueTelegramPlugin } from 'vue-tg'
import { initYandexMetrika } from 'yandex-metrika-vue3';
import { YM_ID } from './utils/consts'


const app = createApp(App)
console.log();

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
