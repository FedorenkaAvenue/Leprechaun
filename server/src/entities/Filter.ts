import { ApiProperty } from '@nestjs/swagger';

import { IFilterGroup, IFilter } from '@interfaces/Filter';
import { PropertyGroupEntity } from './PropertGroup';
import { PropertyEntity } from './Property';

export class FilterEntity extends PropertyEntity implements IFilter {
    @ApiProperty({ description: 'is selected', required: false })
    selected: boolean;

    @ApiProperty({ description: 'general propduct\'s amount', required: false })
    amount: number;

    @ApiProperty({ description: 'available product\'s amount', required: false })
    available: number;
}

export class FilterGroupEntitry extends PropertyGroupEntity implements IFilterGroup {
    @ApiProperty({ type: FilterEntity, isArray: true, required: false })
    properties: IFilter[];
}
