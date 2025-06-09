import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

import { Trans, TransData } from 'gen/ts/trans';

class TransDataEntity implements TransData {
    @Column({ nullable: true })
    en: string;

    @Column({ nullable: true })
    ua: string;

    @Column({ nullable: true })
    ru: string;
}

@Entity('trans')
export class TransEntity implements Trans {
    @PrimaryColumn('int8', { select: false })
    @Generated('increment')
    id: number;

    @Column(() => TransDataEntity, { prefix: false })
    data: TransDataEntity;
}
