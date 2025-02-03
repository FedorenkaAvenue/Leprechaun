import { Trans } from "@shared/models/interfaces"

export interface Property {
    id: number
    title: Trans
    alt_name: string
    comment: string
    created_at: Date
    updated_at: Date
}
