import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { FilterOptionType, IProperty, IPropertyGroup } from "./index.interface";

export class ProductGroupBaseEntity implements IPropertyGroup {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ select: false })
    @ApiProperty({ enum: FilterOptionType })
    type: FilterOptionType;

    @Column({ unique: true })
    @ApiProperty()
    altName: string;

    @Column({ nullable: true, select: false })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('property_group')
export class PropertyGroupEntity extends ProductGroupBaseEntity implements IPropertyGroup {
    @OneToMany(
        () => PropertyEntity,
        ({ propertyGroup }) => propertyGroup
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
    altName: string;

    @Column({ nullable: true, select: false })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('property')
export class PropertyEntity extends PropertyBaseEntity implements IProperty {
    @ManyToOne(
        () => PropertyGroupEntity,
        ({ properties }) => properties,
        { onDelete: 'CASCADE', eager: true }
    )
    @JoinColumn({ name: "propertyGroup" })
    @ApiProperty()
    propertyGroup: IPropertyGroup;
}
