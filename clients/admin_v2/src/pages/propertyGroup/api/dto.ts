export interface PropertyGroupCreateDTO {
    title: {
        en: string
        ua: string
        ru: string
    }
    alt_name: string
    is_primary?: boolean
    comment?: string
}
