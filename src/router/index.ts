import {createRouter, createWebHistory} from 'vue-router'
import {constantRoutes} from './routes'

// noinspection TypeScriptValidateTypes
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,// 路由规则
    // 滚动行为: 自定义路由 切换时候, 页面如何滚动
    scrollBehavior(to, from, savePosition) {
        return {left: 0, top: 0}
    }
})

export default router