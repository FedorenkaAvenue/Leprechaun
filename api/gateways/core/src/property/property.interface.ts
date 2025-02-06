import { TransI } from "../trans/trans.interface"
export interface PropertyI<T = TransI> {
    id: number
    title: T
    alt_name: string

    comment: string
    created_at: Date
    updated_at: Date
}
