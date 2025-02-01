import { ApiProperty } from "@nestjs/swagger";

import { UserRole } from "@enums/User";
import { UserDataI, UserI } from "@interfaces/User";

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
