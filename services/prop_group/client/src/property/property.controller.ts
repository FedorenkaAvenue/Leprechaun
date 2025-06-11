import { Observable } from "rxjs";

import PropertyService from "./property.service";
import {
    Property, PropertyCU, PropertySearchParams, PropertyServiceController, PropertyServiceControllerMethods,
} from "gen/ts/prop_group";
import { CreatePropertyDTO } from "./property.dto";
import { ValidateDTO } from "@shared/decorators/ValidateDTO.decorator";

@PropertyServiceControllerMethods()
export default class PropertyController implements PropertyServiceController {
    constructor(
        private readonly propertyService: PropertyService,
    ) { }

    @ValidateDTO(CreatePropertyDTO)
    public createProperty(data: PropertyCU): Observable<Property> {
        return this.propertyService.createProperty(data);
    }

    deleteProperty({ id }: PropertySearchParams): Promise<void> {
        return this.propertyService.deleteProperty(id);
    }
}
