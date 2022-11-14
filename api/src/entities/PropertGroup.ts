import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyEntity } from './Property';
import { PropertyGroupI } from '@interfaces/PropertyGroup';

@Entity('property_group')
export class PropertyGroupEntity implements PropertyGroupI {
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

    @OneToMany(() => PropertyEntity, ({ property_group }) => property_group)
    @ApiProperty({ type: () => PropertyEntity, isArray: true })
    properties: PropertyEntity[];
}
