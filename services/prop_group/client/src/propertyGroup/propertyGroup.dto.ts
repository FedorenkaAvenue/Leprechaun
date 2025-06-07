import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PropertyGroupCU } from 'gen/ts/prop_group';
import { TransCU } from 'gen/ts/trans';

export class PropertyGroupCreateDTO implements Omit<PropertyGroupCU, 'title'> {
    @IsNotEmpty()
    @IsString()
    altName: string;

    @IsOptional()
    @IsBoolean()
    isPrimary: boolean;

    @IsOptional()
    @IsString()
    comment: string;
}

// export class PropertyGroupUpdateDTO implements PropertyGroupCreateDTO {
//     @IsOptional()
//     @IsObject()
//     @ValidateNested()
//     @Type(() => TransDTO)
//     @ApiProperty()
//     title: TransDTO;

//     @IsOptional()
//     @IsString()
//     @ApiProperty()
//     alt_name: string;

//     @IsOptional()
//     @IsBoolean()
//     @ApiProperty({ required: false, description: 'visible property for ProductCard', default: false })
//     is_primary: boolean;

//     @IsOptional()
//     @IsString()
//     @ApiProperty({ required: false, default: null })
//     comment: string;
// }
