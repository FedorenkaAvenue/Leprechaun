import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserRole } from "./user.enum";
import { User } from "./user.interface";

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
