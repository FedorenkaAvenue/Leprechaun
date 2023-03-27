import { MappingProperty } from "@elastic/elasticsearch/lib/api/types";
import { SECategoryI, SEProductI } from "@interfaces/SE";
import { TransI } from "@interfaces/Trans";

const TRANS: Record<keyof Omit<TransI, 'id' >, MappingProperty> = {
    en: {
        type: 'text',
    },
    ru: {
        type: 'text',
    },
    ua: {
        type: 'text',
    }
};

export const SE_PRODUCT_PROPERTIES: Record<keyof SEProductI, MappingProperty> = {
    id: {
        type: 'keyword',
    },
    title: {
        properties: TRANS,
    },
    description: {
        properties: TRANS,
    }
    // text: {
    //     type: 'text',
    //     analyzer: 'english',
    //     fields: {
    //         keyword: {
    //             type: 'keyword',
    //             ignore_above: 1024
    //         },
    //         word_delimiter: {
    //             type: 'text',
    //             analyzer: 'word_delimiter'
    //         }
    //     }
    // },
    // name: {
    //     type: 'text',
    //     analyzer: 'english',
    //     fields: {
    //         keyword: {
    //             type: 'keyword',
    //             ignore_above: 256
    //         }
    //     }
    // },
    // id: {
    //     type: 'keyword'
    // }
}

export const SE_CATEGORY_PROPERTIES: Record<keyof SECategoryI, MappingProperty> = {
    id: {
        type: 'keyword',
    },
    title: {
        properties: TRANS,
    },
    // text: {
    //     type: 'text',
    //     analyzer: 'english',
    //     fields: {
    //         keyword: {
    //             type: 'keyword',
    //             ignore_above: 1024
    //         },
    //         word_delimiter: {
    //             type: 'text',
    //             analyzer: 'word_delimiter'
    //         }
    //     }
    // },
    // name: {
    //     type: 'text',
    //     analyzer: 'english',
    //     fields: {
    //         keyword: {
    //             type: 'keyword',
    //             ignore_above: 256
    //         }
    //     }
    // },
    // id: {
    //     type: 'keyword'
    // },
}
