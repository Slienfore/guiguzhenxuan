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

