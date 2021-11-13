import { IProduct } from '@interfaces/Product';
import { IPropertyGroup } from '@interfaces/Property';

export interface ICategory<TIcon = string> {
    id?: number
    url: string
    title: string
    is_public: boolean
    icon: TIcon | null
    products?: Array<IProduct> | null
    property_groups?: Array<IPropertyGroup> | null
    comment: string
}
