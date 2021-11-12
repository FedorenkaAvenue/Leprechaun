import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '@interfaces/User';
import { IProduct } from '@interfaces/Product';

@Entity('user')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    // @Column()
    // @ApiProperty()
    // favorite: IProduct[];

    // @Column()
    // @ApiProperty()
    // visited: IProduct[];
}
