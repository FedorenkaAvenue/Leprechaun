import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ILabel, LabelType } from '@interfaces/Label';

@Entity('label')
export class LabelEntity implements ILabel {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ required: false })
    id: number;

    @Column()
    @ApiProperty({ enum: LabelType, required: false })
    type: LabelType;

    @Column({ nullable: true })
    @ApiProperty({ required: false, description: 'label text' })
    value: string;

    @Column({ nullable: true, select: false })
    @ApiProperty({ required: false })
    comment: string;
}
