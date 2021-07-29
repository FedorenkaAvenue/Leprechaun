export interface Category {
    id: number;
    title: string;
    url: string;
    children: Array<Category> | null;
    icon: string | null;
    parentCategoryId: number | null;
}