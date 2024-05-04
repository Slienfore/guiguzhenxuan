import request from '@/utils/request'
import type { PermissionMenuResponseData, RoleData, RoleResponseData } from './type'

enum API {
    ALL_ROLES_URL = '/admin/acl/role/',// 所有职位接口
    ADD_ROLE_URL = '/admin/acl/role/save',// 新增职位
    UPDATE_ROLE_URL = '/admin/acl/role/update',// 更新职位
    PERMISSION_ROLE_URL = '/admin/acl/permission/toAssign/',// 获取用户权限
    ALLOCATE_ROLE_URL = '/admin/acl/permission/doAssign/?',// 分配权限
    DELETE_ROLE_URL = '/admin/acl/role/remove/',// 删除已有职位
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

// 根据职位ID获取权限
export const reqPermissionRole = (roleId: number) => request.get<any, PermissionMenuResponseData>(API.PERMISSION_ROLE_URL + roleId)

// 分配权限
export const reqAllocateRole = (roleId: number, permissionId: number[]) => request.post(API.ALLOCATE_ROLE_URL +`roleId=${roleId}&permissionId=${permissionId}`)

// 删除已有职位
export const reqDeleteRole = (roleId: number) => request.delete<any, any>(API.DELETE_ROLE_URL + roleId)