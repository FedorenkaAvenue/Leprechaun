import { IProduct } from "@modules/product/index.interface";
import { IPropertyGroup } from "@modules/property/index.interface";

export interface ICategory<TIcon = string> {
    id?: number
    url: string
    title: string
    isPublic: boolean
    icon: TIcon | null
    products?: Array<IProduct> | null
    filterGroups?: Array<IPropertyGroup> | null
}
