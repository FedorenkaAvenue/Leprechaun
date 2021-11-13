import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyGroupOptionType, IProperty, IPropertyGroup } from '@interfaces/Property';

export class ProductGroupBaseEntity implements IPropertyGroup {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ required: false })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ select: false })
    @ApiProperty({ enum: PropertyGroupOptionType, required: false })
    type: PropertyGroupOptionType;

    @Column({ unique: true })
    @ApiProperty({ required: false })
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
    @ApiProperty({ type: () => PropertyEntity, isArray: true, required: false })
    properties: IProperty[];
}

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
    property_group: IPropertyGroup;
}
