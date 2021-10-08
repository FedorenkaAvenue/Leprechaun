import { IProduct } from '@interfaces/Product';
import { IPropertyGroup } from '@interfaces/Property';

type TCategoryId = number

export interface ICategory<TIcon = string> {
    id?: TCategoryId
    url: string
    title: string
    is_public: boolean
    icon: TIcon | null
    products?: Array<IProduct> | null
    property_groups?: Array<IPropertyGroup> | null
}
