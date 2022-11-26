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

    @Column({ nullable: true, select: false })
    @ApiProperty()
    comment: string;

    @Column({ default: false })
    @ApiProperty({ description: 'visible property for ProductCard' })
    is_primary: boolean;

    @ManyToOne(() => PropertyGroupEntity, ({ properties }) => properties, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'property_group' })
    @ApiProperty()
    property_group: PropertyGroupEntity;
}
