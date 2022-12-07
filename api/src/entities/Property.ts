import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyI } from '@interfaces/Property';
import { PropertyGroupEntity } from './PropertGroup';

@Entity('property')
export class PropertyEntity implements PropertyI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ unique: true })
    @ApiProperty()
    alt_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @ManyToOne(() => PropertyGroupEntity, ({ properties }) => properties, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'propertygroup' })
    @ApiProperty()
    propertygroup: PropertyGroupEntity;
}
