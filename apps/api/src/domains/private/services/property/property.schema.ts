import { ApiProperty } from '@nestjs/swagger';
import { PropertyCU } from '@fedorenkaavenue/leprechaun_lib_entities/server/property';
import { PropertyGroup } from '@fedorenkaavenue/leprechaun_lib_entities/server/property_group';

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
