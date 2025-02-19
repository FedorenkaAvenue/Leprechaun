import { ProductPreviewI } from "../product/product.interface"
import { PropertyGroupI } from "../propertyGroup/propertyGroup.interface"
import { TransI } from "../trans/trans.interface"

export interface CategoryI<T = TransI> {
    id: number
    url: string
    title: T
    icon: string | null
    icon_id: string | null
    is_public: boolean
    comment: string | null
    created_at: Date
    updated_at: Date
    products: ProductPreviewI[] | null
    propertygroups: PropertyGroupI[] | null
}
