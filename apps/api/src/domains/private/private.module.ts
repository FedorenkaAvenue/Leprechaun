import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import AuthPrivateModule from "./domains/auth/auth.module";
import PropertyGroupPrivateModule from "./domains/propertyGroup/propertyGroup.module";
import UserPrivateModule from "./domains/user/user.module";

@Module({
    imports: [
        AuthPrivateModule,
        PropertyGroupPrivateModule,
        UserPrivateModule,
        RouterModule.register([
            { module: AuthPrivateModule, path: 'private' },
            { module: PropertyGroupPrivateModule, path: 'private' },
            { module: UserPrivateModule, path: 'private' },
        ]),
    ]
})
export default class PrivateModule { }
