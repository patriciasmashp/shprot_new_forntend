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


const app = createApp(App)

app.use(router)

app.use(VueTelegramPlugin)
app.use(store)
app.mount('#app')
