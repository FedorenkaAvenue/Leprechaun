export enum ProductLabelType {
    DISCOUNT = 1,
    NEW = 2
}

export interface ProductLabelI {
    id: 0,
    type: ProductLabelType,
    value: "string",
    comment: "string",
    color?: string
}