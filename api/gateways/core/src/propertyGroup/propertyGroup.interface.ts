import { CategoryI } from "../category/category.interface"
import { TransI } from "../trans/trans.interface"

export interface PropertyGroupI<T = TransI> {
    id: number
    title: T
    alt_name: string
    is_primary: boolean
    comment: string
    created_at: Date
    updated_at: Date
    categories: CategoryI[]
}
