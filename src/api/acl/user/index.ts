import request from '@/utils/request'
import type { AllRoleResponseData, AssignRoleData, User, UserResponseData } from './type'

enum API {
    USER_LIST_URL = '/admin/acl/user/',// 系统所有用户列表
    ADD_USER_URL = '/admin/acl/user/save',// 新增用户
    UPDATE_USER_URL = '/admin/acl/user/update', // 修改用户
    USER_ALL_ROLE_URL = '/admin/acl/user/toAssign/',// 获取当前帐号的职位信息
    ASSIGN_ROLE_URL = '/admin/acl/user/doAssignRole',// 分配角色
}

// 系统所有用户列表
export const reqUserList = (page: number, limit: number) => request.get<any, UserResponseData>(API.USER_LIST_URL + `${page}/${limit}`)

// 更新 | 添加用户
export const reqAddOrUpdateUser = (data: User) => {
    if (!data.id) {// 没有用户ID -> 新增
        return request.post<any, any>(API.ADD_USER_URL, data)
    } else {// 有用户ID -> 更新
        return request.put<any, any>(API.UPDATE_USER_URL, data)
    }
}

// 获取当前用户的职位
export const reqGetUserRoles = (userId: number) => request.get<any, AllRoleResponseData>(API.USER_ALL_ROLE_URL + userId)

// 分配角色
export const reqAssignRole = (data: AssignRoleData) => request.post<any, any>(API.ASSIGN_ROLE_URL, data)