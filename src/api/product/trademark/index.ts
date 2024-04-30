import request from '@/utils/request'
import type {Trademark, TrademarkResponseData} from './type'

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',// 所有品牌列表
    ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',// 添加
    EDIT_TRADEMARK_URL = '/admin/product/baseTrademark/update',// 编辑
    DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/'
}

// 返回所有品牌
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`)

// 添加品牌
export const reqAddTrademark = (data: Trademark) => request.post<any, any>(API.ADD_TRADEMARK_URL, data)

// 修改品牌
export const reqEditTrademark = (data: Trademark) => request.put<any, any>(API.EDIT_TRADEMARK_URL, data)

export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_TRADEMARK_URL + id)




