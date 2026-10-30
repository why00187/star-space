import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import naive from 'naive-ui'
// 全局样式放最上方，防止样式覆盖顺序出问题
import '@/assets/main.scss'

const app = createApp(App)

// 注册插件
app.use(router)
app.use(pinia)
app.use(naive)

app.mount('#app')