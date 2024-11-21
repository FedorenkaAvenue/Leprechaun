import { ProductPreviewModel } from "@entities/product/models/Product"

export interface DashboardModel {
    title: string
    list: ProductPreviewModel[] | undefined
}
