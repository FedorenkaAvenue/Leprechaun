import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IProperty } from '@interfaces/Property';
import { PropertyEntity } from './Property';
import { IPropertyGroup } from '@interfaces/PropertyGroup';
import { FilterType } from '@interfaces/Filter';

export class ProductGroupBaseEntity implements IPropertyGroup {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ required: false })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ default: FilterType.List })
    @ApiProperty({ enum: FilterType, required: false })
    type: FilterType;

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
