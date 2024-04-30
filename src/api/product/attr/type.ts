export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface Category {
    id: number | string
    name: string
    category1Id?: number
    category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
    data: Category[]
}


// 属性值
export interface AttrValue {
    id?: number
    valueName: string
    attrId?: number
    flag?: boolean// 控制属性值的编辑模式和切换模式
}

// 属性值列表
export type AttrValueList = Array<AttrValue>

// 属性列表
export interface Attr {
    id?: number
    attrName: string
    attrValueList: AttrValueList
    categoryId: number | string
    categoryLevel: number
}

export type AttrList = Array<Attr>

// 属性响应数据类型
export interface AttrResponseData extends ResponseData {
    data: AttrList
}