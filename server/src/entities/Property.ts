import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IProperty } from '@interfaces/Property';
import { PropertyGroupEntity } from './PropertGroup';

export class PropertyBaseEntity implements IProperty {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ required: false })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ unique: true })
    @ApiProperty({ required: false })
    alt_name: string;

    @Column({ nullable: true, select: false })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('property')
export class PropertyEntity extends PropertyBaseEntity implements IProperty {
    @ManyToOne(
        () => PropertyGroupEntity,
        ({ properties }) => properties,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'property_group' })
    @ApiProperty({ required: false })
    property_group: PropertyGroupEntity;
}
