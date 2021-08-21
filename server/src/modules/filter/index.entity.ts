import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { IFilter, IFilterGroup } from "./index.interface";

export class FilterGroupBaseEntity implements IFilterGroup {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    type: number;

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
    // @ManyToOne(() => any, ({ products }) => products)
    // @JoinColumn({ name: "category" })
    // @ApiProperty({ type: () => CategoryEntity })
    filters: any;
}

@Entity('filter')
export class FilterEntity implements IFilter {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    groupId: number;

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
