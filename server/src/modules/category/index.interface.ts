import { IProduct } from "@modules/product/index.interface";
import { IFilterGroup } from "@modules/filter/index.interface";

export interface ICategory<TIcon = string> {
    id?: number
    url: string
    title: string
    isPublic: boolean
    icon: TIcon | null
    products?: Array<IProduct> | null
    filterGroups?: Array<IFilterGroup> | null
}
