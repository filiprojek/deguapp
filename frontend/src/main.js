import './assets/_general.scss'
import './assets/_vars.scss'
import './assets/nav.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
