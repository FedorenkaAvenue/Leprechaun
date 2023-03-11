import { FilterI, FilterListI } from '@interfaces/Filter';
import { FIlterListDTO, FilterDTO } from '.';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { PropertyGroupPublic } from '@dto/PropertyGroup/constructor';

// class FilterList extends FIlterListDTO {
//     constructor({ properties, ...propGroup }: PropertyGroupI) {
//         super();
//         this.properties = properties;
//         this.propertyGroup = new PropertyGroupPublic(propGroup,);
//     }
// }

export class FilterPublic extends FilterDTO {
    constructor({ type, data }: FilterI) {
        super();
        this.type = type;
        this.data = data;
    }
}
