import { ProductPreviewModel } from "@entities/product/models/Product"

export interface DashboardModel {
    title: string | undefined
    list: ProductPreviewModel[] | undefined
}
