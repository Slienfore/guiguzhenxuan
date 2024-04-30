export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface SkuData {
    category3Id: string | number// 三级分类 ID
    spuId: string | number// SPU ID
    tmId: string | number// SKU 品牌ID
    skuName: string// SKU 名称
    price: string | number// SKU 价格
    weight: string | number// SKU 重量
    skuDesc: string// SKU 描述
    // 平台属性
    skuAttrValueList: Array<{ attrId: number | string, valueId: number | string }>
    // 销售属性
    skuSaleAttrValueList: Array<{ saleAttrId: number | string, saleAttrValueId: number | string }>
    skuDefaultImg: string// sku 图片默认地址
    isSale?: number// 商品上架信息
    id?: number// 商品ID
}

// 响应数据
export interface SkuResponseData extends ResponseData {
    data: {
        records: Array<SkuData>
        total: number
        size: number
        current: number
        orders: []
        optimizeCountSql: boolean
        countId: null
        maxLimit: null
        searchCount: boolean
        pages: number
    }
}