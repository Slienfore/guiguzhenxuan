import type { Category } from '@/api/product/attr/type'
export interface UserState {
    token: string | null
}

export interface CategoryState {
    categoryOne: Array<Category>
    categoryOneId: number | string
    categoryTwo: Array<Category>
    categoryTwoId: number | string
    categoryThree: Array<Category>
    categoryThreeId: number | string
}