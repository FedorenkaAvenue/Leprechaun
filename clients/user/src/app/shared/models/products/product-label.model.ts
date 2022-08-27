import { ProductLabelType } from "@shared/enums";

export interface ProductLabelI {
    type: ProductLabelType,
    value: string,
    id?: 0,
    comment?: string,
    color?: string
}