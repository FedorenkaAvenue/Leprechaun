import { CategoryDto } from "../shared/models/categories.model";

export const CATEGORY_SHORT_LIST: CategoryDto[] = [
    {
        id: 1,
        title: 'Ковдри',
        url: 'kovdry',
        is_public: true,
        children: [],
        icon: 'https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwzOTU0NTB8fGVufDB8fHx8&w=1000&q=80',
        parentCategoryId: null,
    },
    {
        id: 2,
        title: 'Комлект білизни',
        url: 'komplekty-bilizny',
        is_public: true,
        children: [],
        icon: '',
        parentCategoryId: null,
    },
    {
        id: 3,
        title: 'Пледи',
        url: 'pledu',
        is_public: true,
        children: [],
        icon: '',
        parentCategoryId: null,
    },
    {
        id: 4,
        title: 'Подушки',
        url: 'podushku',
        is_public: true,
        children: [],
        icon: '',
        parentCategoryId: null,
    },
    {
        id: 5,
        title: 'Матраци',
        url: 'matrazy',
        is_public: true,
        children: [],
        icon: '',
        parentCategoryId: null,
    } 
]