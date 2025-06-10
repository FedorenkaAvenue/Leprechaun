import { Property } from "gen/ts/prop_group";
import { PropertyEntity } from "./property.entity";
import { TransData } from "gen/ts/trans";

export default class PropertyMapper {
    static toView(property: PropertyEntity, titleTrans: TransData): Property {
        return {
            ...property,
            title: titleTrans,
        };
    }
}
