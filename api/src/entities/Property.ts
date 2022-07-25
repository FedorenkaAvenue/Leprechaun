import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IProperty } from '@interfaces/Property';
import { PropertyGroupEntity } from './PropertGroup';

export class PropertyBaseEntity implements IProperty {
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
}

@Entity('property')
export class PropertyEntity extends PropertyBaseEntity implements IProperty {
    @ManyToOne(
        () => PropertyGroupEntity,
        ({ properties }) => properties,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'property_group' })
    @ApiProperty()
    property_group: PropertyGroupEntity;
}
