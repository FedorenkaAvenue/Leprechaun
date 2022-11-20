export const ORDER_RELATIONS = ['list', 'list.product'];

export const PRODUCT_RELATIONS = [
    'category',
    'properties',
    'properties.property_group'
];
export const PRODUCT_DEEP_RELATIONS = [
    'product',
    'product.category',
    'product.properties',
    'product.properties.property_group',
];
