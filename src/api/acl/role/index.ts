import request from '@/utils/request'
import type { RoleResponseData } from './type'

enum API {
    ALL_ROLES_URL = '/admin/acl/role/',// 所有职位接口
}

// 获取全部职位列表
export const reqAllRolesList = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALL_ROLES_URL + `${page}/${limit}/?roleName=${roleName}`)

