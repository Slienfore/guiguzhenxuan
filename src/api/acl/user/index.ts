import request from '@/utils/request'
import type { User, UserResponseData } from './type'

enum API {
    USER_LIST_URL = '/admin/acl/user/',// 系统所有用户列表
    ADD_USER_URL = '/admin/acl/user/save',// 新增用户
    UPDATE_USER_URL = '/admin/acl/user/update', // 修改用户
}

// 系统所有用户列表
export const reqUserList = (page: number, limit: number) => request.get<any, UserResponseData>(API.USER_LIST_URL + `${page}/${limit}`)

export const reqAddOrUpdateUser = (data: User) => {
    if (!data.id) {// 没有用户ID -> 新增
        return request.post<any, any>(API.ADD_USER_URL, data)
    } else {// 有用户ID -> 更新
        return request.put<any, any>(API.UPDATE_USER_URL, data)
    }
}