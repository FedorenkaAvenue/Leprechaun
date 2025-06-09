import { ApiProperty } from '@nestjs/swagger';

import { PropertyCU, PropertyGroup } from '@gen/prop_group';
import { TransSchema } from '@common/trans/trans.schema';

export class CreatePropertySchema implements PropertyCU {
    @ApiProperty({ type: 'number', description: 'property group ID' })
    propertyGroup: PropertyGroup['id'];

    @ApiProperty()
    title: TransSchema;

    @ApiProperty()
    altName: string;

    @ApiProperty({ required: false, default: null })
    comment: string;
}
