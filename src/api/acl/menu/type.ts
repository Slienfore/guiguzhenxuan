export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface Permission {
    id?: number
    name: string
    children?: PermissionList
    level: number
    select: boolean
    code: null// 权限值
    createTime: string
    updateTime: string
    pid: number
    toCode: null
    type: number
    status: null
}

export type PermissionList = Permission[]

export interface PermissionResponseData extends ResponseData  {
    data: PermissionList
}
