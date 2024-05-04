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

// 更新菜单与修改菜单携带的参数值
export interface AddOrUpdatePermission {
    id?: number// ID
    code: string// 菜单权限值
    level: number// 几级菜单
    name: string// 菜单名称
    pid: number// 其父菜单的ID, 添加到哪一个菜单中
}