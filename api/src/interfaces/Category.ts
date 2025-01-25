import { PropertyGroupPreviewI } from '@interfaces/PropertyGroup';
import { TransI } from './Trans';
import { ProductPreviewI } from './Product';

interface BaseI<I, T> {
    id: number
    url: string
    title: T
    icon: I | null
}

export type CategoryPublicI = BaseI<string, string>

export interface CategoryPreviewI extends BaseI<string, TransI> {
    is_public: boolean
    comment: string | null
    created_at: Date
    updated_at: Date
}

export interface CategoryI extends CategoryPreviewI {
    products: ProductPreviewI[] | null
    propertygroups: PropertyGroupPreviewI[] | null
}
