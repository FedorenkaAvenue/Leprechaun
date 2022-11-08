import { ProductLabelType } from "@shared/enums";

export interface ProductLabelI {
    id?: 0,
    type: ProductLabelType,
    value: string,
    comment?: string,
    color?: string
}