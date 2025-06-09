import { Trans } from "@shared/models/interfaces"

export interface Property {
    id: number
    title: Trans
    altName: string
    comment: string
    createdAt: Date
    updatedAt: Date
}
