import {
    CATEGORY_LIST_SEGMENT, CREATE_SEGMENT, DASHBOARD_SEGMENT, PRODUCT_LIST_SEGMENT, PROPERTY_GROUP_LIST_SEGMENT,
    TOOLS_SEGMENT, AUTH_SEGMENT, EMPLOYER_LIST_SEGMENT, ADMIN_SEGMENT, EMPLOYER_SEGMENT,
} from "../constants/routerSegments";

const routerSubConfig = {
    auth: {
        title: 'Auth',
        segment: AUTH_SEGMENT,
        path: `/${AUTH_SEGMENT}`,
    },
    admin: {
        title: 'Admin',
        segment: ADMIN_SEGMENT,
        path: `/${ADMIN_SEGMENT}`,
    },
    employerCreate: {
        title: 'Create employer',
        segment: CREATE_SEGMENT,
        path: `/admin/${EMPLOYER_SEGMENT}/${CREATE_SEGMENT}`,
    },
    employerList: {
        title: 'Employers',
        segment: EMPLOYER_LIST_SEGMENT,
        path: `/admin/${EMPLOYER_LIST_SEGMENT}`,
    },
    tools: {
        title: 'Tools',
        segment: TOOLS_SEGMENT,
        path: `/${TOOLS_SEGMENT}`,
    },
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
