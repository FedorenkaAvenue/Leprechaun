import { ApiProperty } from "@nestjs/swagger";

import { UserDataI, UserI } from "./user.interface";
import { UserRole } from "./user.enum";

export class UserDataDTO implements UserDataI {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: UserRole })
    role: UserRole;

    @ApiProperty({ type: 'string', nullable: true })
    email: string | null;

    constructor({ id, role, email }: UserI) {
        this.id = id;
        this.role = role;
        this.email = email;
    }
}
