import { ProductLabelType } from "@shared/enums";
import { ProductLabelI } from "@shared/models";

export const PRODUCT_LABELS_1: Array<ProductLabelI> = [
    {
        id: '1',
        type: ProductLabelType.DISCOUNT,
        value: '20'
    },
    {
        id: '2',
        type: ProductLabelType.NEW,
        value: '10' 
    }
]

export const PRODUCT_LABELS_2: Array<ProductLabelI> = [
    {
        id: '20',
        type: ProductLabelType.DISCOUNT,
        value: '20'
    },
]

export const PRODUCT_LABELS_3: Array<ProductLabelI> = [
    {
        id: '30',
        type: ProductLabelType.NEW,
        value: '20'
    },
]

