import { Property } from "gen/property";
import { PropertyEntity } from "./property.entity";
import { TransData } from "gen/trans";

export default class PropertyMapper {
    static toView(property: PropertyEntity, titleTrans: TransData): Property {
        return {
            ...property,
            title: titleTrans,
        };
    }
}
