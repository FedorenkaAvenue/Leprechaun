import { ApiProperty } from "@nestjs/swagger";

import { User, UserRole } from "@gen/user";

export class UserDataDTO implements Omit<User, 'password'> {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: UserRole })
    role: UserRole;

    @ApiProperty({ type: 'string' })
    email: string;

    constructor({ id, role, email }: User) {
        this.id = id;
        this.role = role;
        this.email = email;
    }
}
