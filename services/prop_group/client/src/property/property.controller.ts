import { map, Observable } from "rxjs";
import {
    Property,
    PropertyCU,
    PropertyList,
    PropertyListPrivateSearchParams,
    PropertySearchParams,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/property";
import { ValidateRPCDTO } from "@fedorenkaavenue/leprechaun_lib_utils/decorators";
import {
    PropertyServiceController, PropertyServiceControllerMethods,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/property_group";

import { CreatePropertyDTO } from "./property.dto";
import PropertyService from "./property.service";

@PropertyServiceControllerMethods()
export default class PropertyController implements PropertyServiceController {
    constructor(private readonly propertyService: PropertyService) { }

    getPropertyList({ ids }: PropertyListPrivateSearchParams): Observable<PropertyList> {
        return this.propertyService.getPropertyList(ids).pipe(
            map(res => ({ items: res }))
        );
    }

    @ValidateRPCDTO(CreatePropertyDTO)
    public createProperty(data: PropertyCU): Observable<Property> {
        return this.propertyService.createProperty(data);
    }

    deleteProperty({ id }: PropertySearchParams): Promise<void> {
        return this.propertyService.deleteProperty(id);
    }
}
