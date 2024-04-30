import {defineStore} from 'pinia'
import {reqLogin, reqUserInfo, reqLogout} from '@/api/user'
import type {LoginForm, LoginResponseData, UserInfoResponseData} from "@/api/user/type";
import {reactive, ref} from 'vue'
import {SET_TOKEN, GET_TOKEN, REMOVE_TOKEN} from '@/utils/token'
import {constantRoutes} from '@/router/routes'

const useUserStore = defineStore('User', () => {
    const token = ref<string | null>(GET_TOKEN())// 获取存储的 TOKEN
    const username = ref('')// 用户信息
    const avatar = ref('')// 用户头像

    // 用户登录
    const userLogin = async (data: LoginForm) => {
        const res: LoginResponseData = await reqLogin(data)
        if (res.code === 200) {
            token.value = res.data as string
            SET_TOKEN(res.data as string)// 存储 TOKEN
            return 'OK'
        } else {
            return Promise.reject(new Error(res.data as string))
        }
    }

    // 获取用户信息
    const userInfo = async () => {
        const res: UserInfoResponseData = await reqUserInfo()
        console.log(res)
        if (res.code === 200) {// 存储用户信息
            username.value = res.data.name
            avatar.value = res.data.avatar
            return Promise.resolve('OK')
        } else {
            return Promise.reject(new Error(res.message))
        }
    }

    // 退出登录
    const userLogout = async () => {// 清除本地信息
        const res: any = await reqLogout()
        if (res.code) {
            token.value = ''
            username.value = ''
            avatar.value = ''
            REMOVE_TOKEN()
            return Promise.resolve('OK')
        } else {
            return Promise.reject(new Error(res.message))
        }
    }

    const menuRoutes = reactive(constantRoutes)// 生成菜单路由数组

    return {token, userLogin, userInfo, userLogout, menuRoutes, username, avatar}
})

export default useUserStore