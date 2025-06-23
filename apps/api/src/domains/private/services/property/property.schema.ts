import { ApiProperty } from '@nestjs/swagger';

import { PropertyCU } from '@gen/property';
import { TransSchema } from '@common/trans/trans.schema';
import { PropertyGroup } from '@gen/property_group';

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
