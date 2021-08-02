export interface ICategory {
    id?: number;
    title: string;
    url: string;
    icon: string | null;
    parentCategoryId: number | null;
    children: Array<ICategory> | null;
}
