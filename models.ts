// ! КАТЕГОРИИ

interface CategoryBase {
    id: number
    url: string
    title: string
    isPublic: boolean
    icon: string | null
    products?: Array<Product> | null
}

// ! ГЛАВНАЯ

// бигборд товаров для главной страницы
interface ProductBillboard {
    type: ProductBillboardType
    title: string
    list: Array<ProductShortInfo>
}

enum ProductBillboardType {
    New = 1,
    Popular
}

// ! ПРОДУКТ

interface Product extends ProductBase {
    images: Array<string>
}

interface ProductShortInfo extends ProductBase {
    image: string
}

interface ProductBase {
    title: string
    id: string
    category: number
    isPublic: boolean
    price: number
    // labels: Array<ProductLabel> | null
    // properties: Array<ProductProperty>
}

interface ProductProperty {
    property: string
    value: string
}

interface ProductLabel {
    id: number
    value: string
}

// ! ФИЛЬТРЫ

enum FilterType {
    Price = 1,
    Producer,
    Universal
}

enum FilterOptionType {
    List = 1,
    Range,
}

interface RangeMinMax {
    min: number;
    max: number;
}

interface ProductBaseFilter {

}

interface ProductFilter {
    chosen: any;
    options: Array<FilterProductPrice | FilterProductProducer | FilterProductUniversal>;
}

interface FilterProductBase {
    type: FilterType;
    optionId: number;
    optionName: string;
    optionTitle: string;
    optionType: FilterOptionType;
// TODO orderType - ?????
    order: number;
}

interface FilterProductPrice {
    chosenValues: RangeMinMax;
    range_values: RangeMinMax
}

interface FilterProductProducer {
    option_values: Array<any>;
    totalFiltered: number;
    totalFound: number;
}

interface FilterProductUniversal {
    option_values: Array<any>;
    totalFiltered: number;
    totalFound: number;
}
