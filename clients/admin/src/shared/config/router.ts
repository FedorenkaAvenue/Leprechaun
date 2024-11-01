import {
    CATEGORY_LIST_SEGMENT, CREATE_SEGMENT, DASHBOARD_SEGMENT, PRODUCT_LIST_SEGMENT, PROPERTY_GROUP_LIST_SEGMENT,
} from "../constants/routerSegments";

const routerSubConfig = {
    dashboard: {
        title: 'Dashboard',
        segment: DASHBOARD_SEGMENT,
        path: `/${DASHBOARD_SEGMENT}`,
    },
    propertyGroupList: {
        title: 'Property groups',
        segment: PROPERTY_GROUP_LIST_SEGMENT,
        path: `/${PROPERTY_GROUP_LIST_SEGMENT}`,
    },
    propertyGroupCreate: {
        title: 'Create property',
        segment: CREATE_SEGMENT,
        path: `/${PROPERTY_GROUP_LIST_SEGMENT}/${CREATE_SEGMENT}`,
    },
    categoryList: {
        title: 'Category list',
        segment: CATEGORY_LIST_SEGMENT,
        path: `/${CATEGORY_LIST_SEGMENT}`,
    },
    categoryCreate: {
        title: 'Create category',
        segment: CREATE_SEGMENT,
        path: `/${CATEGORY_LIST_SEGMENT}/${CREATE_SEGMENT}`,
    },
    productList: {
        title: "Product list",
        segment: PRODUCT_LIST_SEGMENT,
        path: `/${PRODUCT_LIST_SEGMENT}`,
    },
    productCreate: {
        title: "Create product",
        segment: CREATE_SEGMENT,
        path: `/${PRODUCT_LIST_SEGMENT}/${CREATE_SEGMENT}`,
    }
} as const;

export default routerSubConfig;
