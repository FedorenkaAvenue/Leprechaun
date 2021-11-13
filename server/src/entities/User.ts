import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '@interfaces/User';
import { IProduct } from '@interfaces/Product';
import { ProductEntity } from './Product';

@Entity('user')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    // @ManyToMany(
    //     () => ProductEntity,
    //     ({ id }) => id,
    //     { cascade: true }
    // )
    // @JoinTable({
    //     name: '_favorite',
    //     joinColumn: {
    //         name: 'user_id',
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'product_id',
    //         referencedColumnName: 'id'
    //     }
    // })
    // @ApiProperty({
    //     description: 'list of favotires products',
    //     isArray: true,
    //     required: false
    // })
    // favorite: IProduct[];

    // @Column()
    // @ApiProperty()
    // visited: IProduct[];
}
