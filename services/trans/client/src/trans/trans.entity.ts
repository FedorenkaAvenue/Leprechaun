import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

import { Trans } from 'gen/ts/trans';

@Entity('trans')
export class TransEntity implements Trans {
    @PrimaryColumn('int8', { select: false })
    @Generated('increment')
    id: number;

    @Column({ nullable: true })
    en: string;

    @Column({ nullable: true })
    ua: string;

    @Column({ nullable: true })
    ru: string;
}
