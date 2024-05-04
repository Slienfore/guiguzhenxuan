import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'// ElementPlus
import 'element-plus/dist/index.css'// ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'// ElementPlus Icon
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'// 国际化
import 'virtual:svg-icons-register'// 引入 svg 图标
import '@/style/index.scss'// 引入全局CSS样式
import router from '@/router'// router
import pinia from '@/store'// pinia 数据管理
import 'element-plus/theme-chalk/dark/css-vars.css'// 暗黑模式

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {// 全局注册 ICON 组件
    app.component(key, component)
}

// 国际化 ElementPlus
app.use(ElementPlus, {locale: zhCn})

import globalComponent from '@/components'// 引入 自定义插件, 注册整个项目的全局组件
app.use(globalComponent)

app.use(router)
import './permission'// 引入路由鉴权
app.use(pinia)

app.mount('#app')
