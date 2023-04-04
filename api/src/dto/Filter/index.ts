import { ApiProperty } from '@nestjs/swagger';

import { FilterListI, FilterListItemI } from '@interfaces/Filter';
import { PropertyGroupPublicI } from '@interfaces/PropertyGroup';

export class FIlterListDTO implements FilterListI {
    @ApiProperty({ required: true })
    group: PropertyGroupPublicI;

    @ApiProperty({ required: true })
    list: FilterListItemI[];
}
