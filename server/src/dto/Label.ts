// import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// import { ILabel, LabelType } from '@interfaces/Label';

// export class CreateLabelDTO implements ILabel {
//     @IsNotEmpty()
//     @IsEnum(LabelType)
//     @ApiProperty({ enum: LabelType })
//     type: LabelType;

//     @IsOptional()
//     @IsString()
//     @ApiProperty({ required: false })
//     value: string;

//     @IsOptional()
//     @IsString()
//     @ApiProperty({ required: false, default: null })
//     comment: string;
// }

// export class CreateLabelDTOConstructor extends CreateLabelDTO {
//     constructor({ type, value, comment }: CreateLabelDTO) {
//         super();
//         this.type = type;
//         this.value = value || null;
//         this.comment = comment || null;
//     }
// }
