import { User, UserRole } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
