import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

import { TransI } from '@interfaces/Trans';

@Entity('trans')
export class TransEntity implements TransI {
    @PrimaryColumn('int8', { select: false })
    @Generated('increment')
    id: number;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    en: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    ua: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    ru: string;
}
