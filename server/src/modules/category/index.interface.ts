export interface ICategory {
    id?: number;
    title: string;
    url: string;
    icon: string;
    parentCategoryId: number;
    children: string;
}
