interface Catagory {
    id: number
    title: string
    url: string
    children: Array<Catagory> | null
    icon: string | null
}

// главная

interface PopularProductShortList {
    categoryId: number
    title: string
    list: Array<ProductShortInfo>
}

// продукт

interface BaseProductItem {
    title: string
    id: number
    price: number
    labels: Array<ProductLabel> | null
    properties: Array<ProductPropertyItem>
}

interface Product {
    images: Array<string>
}

interface ProductPropertyItem {
    property: string
    value: string
}

interface ProductShortInfo extends BaseProductItem {
    image: string
}

interface ProductLabel {
    id: number
    value: string
}

// filters
