import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ILabel, LabelType } from '@interfaces/Label';

@Entity('label')
export class LabelEntity implements ILabel {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty({ enum: LabelType })
    type: LabelType;

    @Column({ nullable: true })
    @ApiProperty({ required: false, description: 'label text' })
    value: string;

    @Column({ nullable: true, select: false })
    @ApiProperty({ required: false })
    comment: string;
}
