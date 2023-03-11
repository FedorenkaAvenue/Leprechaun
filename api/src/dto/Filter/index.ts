import { ApiProperty } from '@nestjs/swagger';

import FilterE from '@enums/Filter';
import { FilterI, FilterListI, FilterListItemI } from '@interfaces/Filter';
import { PropertyGroupPublicI } from '@interfaces/PropertyGroup';

export class FilterDTO implements FilterI {
    @ApiProperty({
        description: 'filter type',
        required: true,
        enum: FilterE,
    })
    type: FilterE;

    @ApiProperty({ required: true })
    data: unknown;
}

export class FIlterListDTO implements FilterListI {
    @ApiProperty({ required: true })
    group: PropertyGroupPublicI;

    @ApiProperty({ required: true })
    list: FilterListItemI[];
}
