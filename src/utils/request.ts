import axios from 'axios'// 引入 axios
import {ElMessage} from 'element-plus'
import useUserStore from '@/store/modules/user'

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API// 基础路径 -> 环境配置获取
axios.defaults.timeout = 5000// 超时时间

// 拦截器 - 请求
axios.interceptors.request.use((config) => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token// 携带 token
    }

    return config
})

// 拦截器 - 响应
axios.interceptors.response.use((response) => {// 网络响应返回值
    return response.data
}, (error) => {
    let message: string
    const status: number = error.response.status

    switch (status) {
        case 401:
            message = 'Token 过期'
            break
        case 403:
            message = '无权访问'
            break
        case 404:
            message = '请求地址错误'
            break
        case 500:
            message = '服务器故障'
            break
        default:
            message = '网络故障'
            break
    }

    ElMessage({type: 'error', message})

    return Promise.reject(error)
})

export default axios