import { Property } from "./Property"
import { Trans } from "./Trans"

export interface PropertyGroup {
    id: number
    title: Trans
    alt_name: string
    is_primary: boolean
    properties: Property[]
    comment: string
}
