import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

import { IPrice } from "@interfaces/Price";

export class PriceEntity implements IPrice {
    @Column({ name: 'price_current' })
    @ApiProperty()
    current: number;

    @Column({ name: 'price_old', nullable: true })
    @ApiProperty({ nullable: true })
    old: number;
}
