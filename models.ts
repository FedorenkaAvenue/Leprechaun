enum FilterOptionType {
    List = 1,
    Range,

}

enum FilterType {
    Price = 1,
    Producer,
    Universal
}

interface RangeMinMax {
    min: number;
    max: number;
}

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



