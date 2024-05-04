export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// 角色数据
export interface RoleData {
    id?: number
    roleName?: string
    createTime?: string
    updateTime?: string
    remark?: null
}

export type Records = RoleData[]

// 角色列表响应数据
export interface RoleResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        optimizeCountSql: boolean
        hitCount: boolean
        countId: null
        maxLimit: null
        searchCount: boolean
        pages: number
    }
}

// 权限菜单数据
export interface PermissionMenuData {
    id: number
    name: string
    level: number
    select: boolean
    children?: PermissionMenuList
    type: number
    code: string
    status: null
    createTime: string
    updateTime: string
    pid: number
}

export type PermissionMenuList = PermissionMenuData[]

export interface PermissionMenuResponseData extends ResponseData {
    data: PermissionMenuList
}