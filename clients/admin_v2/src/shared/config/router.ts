import {
    CATEGORY_LIST_SEGMENT, CREATE_SEGMENT, PROPERTY_GROUP_LIST_SEGMENT,
} from "../constants/routerSegments";

const routerSubConfig = {
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
} as const;

export default routerSubConfig;
