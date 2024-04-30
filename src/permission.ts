// 路由鉴权(某个路由什么条件下能够访问, 何时不能访问)
import router from '@/router'
import setting from '@/setting'
import pinia from '@/store'// 先引入 pinia(大仓库)
import useUserStore from '@/store/modules/user'// (小仓库)
import nprogress from 'nprogress'// 引入进度条
import 'nprogress/nprogress.css'// 引入样式
import {storeToRefs} from "pinia";

nprogress.configure({showSpinner: false})// 关闭进度条的 转圈
const userStore = useUserStore(pinia)// 用户存储

// 前置守卫
router.beforeEach(async (to, from, next) => {
    nprogress.start()// 进度条开始

    // 未登录, 则不能访问其它 | 已经登录, 则能够访问其它页面, 但是不能访问登录页面
    const {token, username} = storeToRefs(userStore)

    if (token.value) {// 已登录
        if (to.path === '/login') {// 已经登录不能够进入 login 页面
            next({path: '/'})
        } else {// 请求别的路径时候, 等待获取用户信息成功后再进行放行
            if (username.value) {
                next()
            } else {// 异步等待获取用户信息后再登录
                try {
                    await userStore.userInfo()
                    next()
                } catch (err) {// 获取不到 用户信息, token 过期
                    await userStore.userLogout()// 退出登录
                    next({path: '/login', query: {redirect: to.path}})// 进行登录
                }
            }
        }
    } else {// 未登录
        if (to.path === '/login') {// 能够访问登录页面
            next()
        } else {// 访问其它页面时候, 保存其 历史访问页面, 登录成功后进行跳转到该页面
            next({path: '/login', query: {redirect: to.path}})
        }
    }

    next()
})

// 后置守卫
router.afterEach((to, from) => {
    nprogress.done()// 进度条结束
    document.title = `${setting.title} | ${to.meta.title}`
})

