import { map, Observable } from "rxjs";

import PropertyService from "./property.service";
import {
    Property,
    PropertyCU,
    PropertyList,
    PropertyListPrivateSearchParams,
    PropertySearchParams,
} from "gen/property";
import { CreatePropertyDTO } from "./property.dto";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";
import { PropertyServiceController, PropertyServiceControllerMethods } from "gen/property_group";

@PropertyServiceControllerMethods()
export default class PropertyController implements PropertyServiceController {
    constructor(
        private readonly propertyService: PropertyService,
    ) { }

    getPropertyList({ ids }: PropertyListPrivateSearchParams): Observable<PropertyList> {
        return this.propertyService.getPropertyList(ids).pipe(
            map(res => ({ items: res }))
        );
    }

    @ValidateDTO(CreatePropertyDTO)
    public createProperty(data: PropertyCU): Observable<Property> {
        return this.propertyService.createProperty(data);
    }

    deleteProperty({ id }: PropertySearchParams): Promise<void> {
        return this.propertyService.deleteProperty(id);
    }
}
