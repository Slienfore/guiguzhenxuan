import request from '@/utils/request'
import type {LoginForm, LoginResponseData, UserInfoResponseData} from './type'

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}

// (axios.post<T=any, R=AxiosResponse>, 以下的 any 是用来占位的, LoginResponseData: 相应的数据类型)

// 登录
export const reqLogin = (data: LoginForm) => request.post<any, LoginResponseData>(API.LOGIN_URL, data)

// 用户信息
export const reqUserInfo = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL)

// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)