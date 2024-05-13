import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// style
import '@/assets/base.scss'
import '@/assets/icon/iconfont.css'

// util
import Request from '@/util/Request.js'
import Message from '@/util/Message.js'


const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.config.globalProperties.Request = Request
app.config.globalProperties.Message = Message

app.mount('#app')
