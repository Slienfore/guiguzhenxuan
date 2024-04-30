export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// 品牌数据类型
export interface Trademark {
    id?: number// 可有可无(添加无, 修改有)
    tmName: string
    logoUrl: string
}

// 品牌数组
export type Records = Array<Trademark>

// 品牌数据响应数据
export interface TrademarkResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        searchCount: boolean
        pages: number
    }
}



