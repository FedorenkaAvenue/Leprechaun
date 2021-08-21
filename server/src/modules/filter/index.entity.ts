import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { FilterOptionType, IFilter, IFilterGroup } from "./index.interface";

export class FilterGroupBaseEntity implements IFilterGroup {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty({ enum: FilterOptionType })
    type: FilterOptionType;

    @Column()
    @ApiProperty()
    altName: string;

    @Column({ default: true })
    @ApiProperty({ required: false })
    isPublic: boolean;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('filter_group')
export class FilterGroupEntity extends FilterGroupBaseEntity implements IFilterGroup {
    @OneToMany(() => FilterEntity, ({ filterGroup }) => filterGroup)
    @ApiProperty({ type: () => FilterEntity, isArray: true })
    filters: FilterEntity[];
}

export class FilterBaseEntity implements IFilter {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    altName: string;

    @Column({ default: true })
    @ApiProperty({ required: false })
    isPublic: boolean;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    comment: string;
}

@Entity('filter')
export class FilterEntity extends FilterBaseEntity implements IFilter {
    @ManyToOne(
        () => FilterGroupEntity,
        ({ filters }) => filters,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: "filterGroup" })
    @ApiProperty()
    filterGroup: FilterGroupEntity;
}
