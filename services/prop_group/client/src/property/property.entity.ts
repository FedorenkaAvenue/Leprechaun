import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { PropertyGroupEntity } from '../propertyGroup/propertyGroup.entity';
import { Property } from 'gen/ts/prop_group';
import { Trans } from 'gen/ts/trans';

@Entity('property')
export class PropertyEntity implements Property {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    title: Trans;

    @Column({ unique: true })
    altName: string;

    @Column({ nullable: true })
    comment: string;

    @ManyToOne(() => PropertyGroupEntity, ({ properties }) => properties, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'propertygroup' })
    propertygroup?: PropertyGroupEntity;
}
