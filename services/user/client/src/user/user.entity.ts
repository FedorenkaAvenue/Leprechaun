import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { User, UserRole } from "gen/user";

@Entity('user')
export default class UserEntity implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: UserRole.UNKNOWN })
    role: UserRole;

    @Column({ type: 'varchar', nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ default: false })
    isAuth: boolean;
}
