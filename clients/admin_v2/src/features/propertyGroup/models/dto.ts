import TransModel from "@shared/models/Trans";

export interface PropertyGroupCreateDTO {
    title: TransModel
    alt_name: string
    is_primary?: boolean
    comment?: string
}
