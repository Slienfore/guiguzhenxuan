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

// 职位对象
export interface RoleData {
    id?: number
    roleName: string
    createTime?: string
    updateTime?: string
    remark?: null
}
// 所有职位列表
export type RoleList = Array<RoleData>

// 用户职位响应数据
export interface AllRoleResponseData extends ResponseData {
    data: {
        assignRoles: RoleList// 分配的职位
        allRolesList: RoleList// 所有职位
    }
}

// 分配角色携带参数
export interface AssignRoleData {
    roleIdList: number[]
    userId: number
}