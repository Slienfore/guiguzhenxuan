import request from '@/utils/request'
import type { AddOrUpdatePermission, PermissionResponseData } from './type'

enum API {
    PERMISSION_ALL_URL = '/admin/acl/permission',// 获取全部菜单数据
    ADD_PERMISSION_URL = '/admin/acl/permission/save/',// 添加菜单
    UPDATE_PERMISSION_URL = '/admin/acl/permission/update',// 更新菜单
}

// 获取全部菜单数据
export const reqAllPermission = () => request.get<any, PermissionResponseData>(API.PERMISSION_ALL_URL)

// 添加与更新菜单数据
export const reqAddOrUpdatePermission = (data: AddOrUpdatePermission) => {
    if (data.id) {// 有 ID -> 更新菜单
        return request.put<any, any>(API.UPDATE_PERMISSION_URL, data)
    } else {// 无 ID -> 添加菜单
        return request.post<any, any>(API.ADD_PERMISSION_URL, data)
    }
}