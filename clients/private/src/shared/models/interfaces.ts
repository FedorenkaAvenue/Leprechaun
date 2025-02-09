export interface Image {
    id: string
    src: string
}

export interface Option {
    id: number | string
    title: string
}

export interface Pagination<D> {
    data: D
    pagination: {
        currentPage: number
        pageCount: number
        totalCount: number
    }
}

export interface Price {
    current: number
    old?: number
}

export interface Trans {
    en: string
    ua: string
    ru: string
}
