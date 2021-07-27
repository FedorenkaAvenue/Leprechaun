export interface ICategory {
    id: number
    title: string
    url: string
    children: Array<ICategory> | null
    icon: string | null
}
