import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyI } from '@interfaces/Property';
import { PropertyGroupEntity } from './PropertGroup';
import { TransI } from '@interfaces/Trans';
import { TransEntity } from './Trans';

@Entity('property')
export class PropertyEntity implements PropertyI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @OneToOne(() => TransEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity })
    title: TransI;

    @Column({ unique: true })
    @ApiProperty()
    alt_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @ManyToOne(() => PropertyGroupEntity, ({ properties }) => properties, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'propertygroup' })
    propertygroup: PropertyGroupEntity;
}
