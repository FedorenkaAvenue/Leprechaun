import { TransData } from "@fedorenkaavenue/leprechaun_lib_entities/server/trans";
import { Property } from "@fedorenkaavenue/leprechaun_lib_entities/server/property";

import { PropertyEntity } from "./property.entity";

export default class PropertyMapper {
    static toView(property: PropertyEntity, titleTrans: TransData): Property {
        return {
            ...property,
            title: titleTrans,
        };
    }
}
