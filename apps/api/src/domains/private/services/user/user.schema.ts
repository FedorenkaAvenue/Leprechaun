import { ApiProperty } from "@nestjs/swagger";

import { User, UserRole } from "@gen/user";

export class UserSchema implements Omit<User, 'password' | 'isAuth'> {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: UserRole })
    role: UserRole;

    @ApiProperty({ type: 'string' })
    email: string;
}
