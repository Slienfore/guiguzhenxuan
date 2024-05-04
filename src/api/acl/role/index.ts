import request from '@/utils/request'
import type { RoleData, RoleResponseData } from './type'

enum API {
    ALL_ROLES_URL = '/admin/acl/role/',// 所有职位接口
    ADD_ROLE_URL = '/admin/acl/save',// 新增职位
    UPDATE_ROLE_URL = '/admin/acl/update',// 更新职位
}

// 获取全部职位列表
export const reqAllRolesList = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALL_ROLES_URL + `${page}/${limit}/?roleName=${roleName}`)

// 新增或修改职位: 更新有 ID | 添加无ID
export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_ROLE_URL, data)
    } else {
        return request.post<any, any>(API.ADD_ROLE_URL, data)
    }
}