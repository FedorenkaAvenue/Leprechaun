import { Trans, TransData } from '@fedorenkaavenue/leprechaun_lib_entities/server/trans';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

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
