import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

import { PriceI } from '@interfaces/Price';

export class PriceEntity implements PriceI {
    @Column({ name: 'price_current' })
    @ApiProperty()
    current: number;

    @Column({ name: 'price_old', nullable: true })
    @ApiProperty({ nullable: true })
    old: number;
}
