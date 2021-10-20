import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyGroupOptionType, IProperty, IPropertyGroup } from '@interfaces/Property';

export class ProductGroupBaseEntity implements IPropertyGroup {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ select: false })
    @ApiProperty({ enum: PropertyGroupOptionType })
    type: PropertyGroupOptionType;

    @Column({ unique: true })
    @ApiProperty()
    alt_name: string;

    @Column({ nullable: true, select: false })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('property_group')
export class PropertyGroupEntity extends ProductGroupBaseEntity implements IPropertyGroup {
    @OneToMany(
        () => PropertyEntity,
        ({ property_group }) => property_group
    )
    @ApiProperty({ type: () => PropertyEntity, isArray: true })
    properties: IProperty[];
}

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
    @ApiProperty()
    property_group: IPropertyGroup;
}
