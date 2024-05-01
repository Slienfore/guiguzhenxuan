import request from '@/utils/request'
import type { UserResponseData } from './type'

enum API {
    USER_LIST_URL = '/admin/acl/user/',// 系统所有用户列表
}

// 系统所有用户列表
export const reqUserList = (page: number, limit: number) => request.get<any, UserResponseData>(API.USER_LIST_URL + `${page}/${limit}`)

