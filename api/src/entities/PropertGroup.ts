import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PropertyEntity } from './Property';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { TransI } from '@interfaces/Trans';
import { TransEntity } from './Trans';

@Entity('propertygroup')
export class PropertyGroupEntity implements PropertyGroupI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @OneToOne(() => TransEntity, ({ id }) => id, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity })
    title: TransI;

    @Column({ unique: true })
    @ApiProperty()
    alt_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @OneToMany(() => PropertyEntity, ({ propertygroup }) => propertygroup)
    @ApiProperty({ type: () => PropertyEntity, isArray: true, required: false })
    properties: PropertyEntity[];

    @Column({ default: false })
    @ApiProperty({ description: 'visible property for ProductCard' })
    is_primary: boolean;
}
