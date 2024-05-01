export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface User {
    id?: string | number
    username?: string
    name?: string
    password?: string
    phone?: string
    roleName?: string
    createTime?: string
    updateTime?: string
}

export type Records = Array<User>

// 用户列表响应数据
export interface UserResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        pages: number
    }
}