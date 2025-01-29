import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { UserI } from "@interfaces/User";
import { UserRole } from "@enums/User";

@Entity('user')
export default class UserEntity implements UserI {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    role: UserRole;

    @Column({ type: 'varchar', nullable: true, default: null })
    @ApiProperty()
    email: string | null;

    @Column()
    @ApiProperty()
    password: string;
}
