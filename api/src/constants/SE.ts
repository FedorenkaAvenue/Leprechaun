import { MappingProperty, MappingTypeMapping } from "@elastic/elasticsearch/lib/api/types";
import { SECategoryI } from "@interfaces/SE";

export const SE_PRODUCT_PROPERTIES: MappingTypeMapping['properties'] = {
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
    title: {
        properties: {
            en: {
                type: 'text',
            },
            ru: {
                type: 'text',
            },
            ua: {
                type: 'text',
            }
        }
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
