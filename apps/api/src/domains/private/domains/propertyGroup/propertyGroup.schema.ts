import { ApiProperty } from "@nestjs/swagger";

import { Property, PropertyGroup } from "@gen/prop_group";
import { Trans } from "@gen/trans";
import { TransSchemas } from "@common/trans/trans.schema";

export class PropertyGroupSchema implements PropertyGroup {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: TransSchemas })
    title: Trans;

    @ApiProperty()
    altName: string;

    @ApiProperty()
    comment: string;

    @ApiProperty({ type: () => PropertySchema, isArray: true })
    properties: Property[];

    @ApiProperty({ description: 'visible property for ProductCard' })
    isPrimary: boolean;
}

export class PropertySchema implements Property {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: TransSchemas })
    title: Trans;

    @ApiProperty()
    altName: string;

    @ApiProperty()
    comment: string;
}
