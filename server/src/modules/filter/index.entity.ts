import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { FilterOptionType, IFilter, IFilterGroup } from "./index.interface";

export class FilterGroupBaseEntity implements IFilterGroup {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty({ enum: FilterOptionType })
    type: FilterOptionType;

    @Column({ unique: true })
    @ApiProperty()
    altName: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('filter_group')
export class FilterGroupEntity extends FilterGroupBaseEntity implements IFilterGroup {
    @OneToMany(
        () => FilterEntity,
        ({ filterGroup }) => filterGroup
    )
    @ApiProperty({ type: () => FilterEntity, isArray: true })
    filters: IFilter[];
}

export class FilterBaseEntity implements IFilter {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ unique: true })
    @ApiProperty()
    altName: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('filter')
export class FilterEntity extends FilterBaseEntity implements IFilter {
    @ManyToOne(
        () => FilterGroupEntity,
        ({ filters }) => filters,
        { onDelete: 'CASCADE', eager: true }
    )
    @JoinColumn({ name: "filterGroup" })
    @ApiProperty()
    filterGroup: IFilterGroup;
}
