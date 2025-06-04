import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.interface";
import { UserRole } from "gen/ts/user";

@Entity('user')
export default class UserEntity implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    role: UserRole;

    @Column({ type: 'varchar' })
    email: string;

    @Column()
    password: string;
}
