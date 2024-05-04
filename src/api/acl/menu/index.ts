import request from '@/utils/request'
import type { PermissionResponseData } from './type'

enum API {
    PERMISSION_ALL_URL = '/admin/acl/permission',// 获取全部菜单数据
}

// 获取全部菜单数据
export const reqAllPermission = () => request.get<any, PermissionResponseData>(API.PERMISSION_ALL_URL)