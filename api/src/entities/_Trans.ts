import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

import { LanguagesI } from '@interfaces/Trans';

export class _LangsTransEntity implements LanguagesI {
    @Column({ nullable: true })
    @ApiProperty({ required: false })
    en: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    ua: string;
}
