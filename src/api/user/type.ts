export interface LoginForm {// 登录表单携带参数
    username: string
    password: string
}

// 响应数据接口 (data 类型不一样)
interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// 登录响应数据类型
export interface LoginResponseData extends ResponseData {
    data: string
}

// 用户信息响应数据
export interface UserInfoResponseData extends ResponseData {
    data: {
        name: string
        avatar: string
        routes: Array<string>
        buttons: Array<string>
        roles: Array<string>
    }
}