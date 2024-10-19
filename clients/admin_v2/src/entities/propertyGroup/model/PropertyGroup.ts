import PropertyModel from "@entities/property/model/Property"
import TransModel from "@shared/models/Trans"

export default interface PropertyGroupModel {
    id: number
    title: TransModel
    alt_name: string
    is_primary: boolean
    properties: PropertyModel[]
    comment: string
}
