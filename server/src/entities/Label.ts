import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ILabel } from '@interfaces/Label';

@Entity('label')
export class LabelEntity implements ILabel {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty({ description: 'label type' })
    type: string

    @Column({ nullable: true })
    @ApiProperty({ required: false, description: 'label text' })
    value: string;
}
