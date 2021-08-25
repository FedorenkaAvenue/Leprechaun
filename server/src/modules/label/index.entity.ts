import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ILabel } from "./index.interface";

@Entity('label')
export class LabelEntity implements ILabel {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ nullable: true })
    @ApiProperty({ required: false, description: 'label text' })
    value: string;
}
