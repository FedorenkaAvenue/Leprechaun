import { ProductPreviewModel } from '@entities/product/model/interfaces'

export interface DashboardModel {
    title: string | undefined
    list: ProductPreviewModel[] | undefined
}
