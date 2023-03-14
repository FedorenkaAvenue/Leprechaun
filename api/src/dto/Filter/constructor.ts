import { ApiProperty } from '@nestjs/swagger';

import { FilterI } from '@interfaces/Filter';
import FilterE from '@enums/Filter';

// class FilterList extends FIlterListDTO {
//     constructor({ properties, ...propGroup }: PropertyGroupI) {
//         super();
//         this.properties = properties;
//         this.propertyGroup = new PropertyGroupPublic(propGroup,);
//     }
// }

export class FilterPublic implements FilterI {
    @ApiProperty({
        description: 'filter type',
        required: true,
        enum: FilterE,
    })
    type: FilterE;

    @ApiProperty({ required: true })
    data: unknown;

    constructor({ type, data }: FilterI) {
        this.type = type;
        this.data = data;
    }
}
