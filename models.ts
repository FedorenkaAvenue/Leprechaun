// ! КАТЕГОРИИ

interface Category {
    id: number
    title: string
    url: string
    children: Array<Category> | null
    icon: string | null
    parentCategoryId: number;

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
