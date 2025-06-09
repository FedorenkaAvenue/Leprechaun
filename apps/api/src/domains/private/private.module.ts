import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import AuthPrivateModule from "./domains/auth/auth.module";
import UserPrivateModule from "./domains/user/user.module";
import PropertyGroupPrivateModule from "./domains/propertyGroup/propertyGroup.module";
import PropertyPrivateModule from "./domains/property/property.module";

@Module({
    imports: [
        AuthPrivateModule,
        PropertyGroupPrivateModule,
        PropertyPrivateModule,
        UserPrivateModule,
        RouterModule.register([
            { module: AuthPrivateModule, path: 'private' },
            { module: PropertyGroupPrivateModule, path: 'private' },
            { module: PropertyPrivateModule, path: 'private' },
            { module: UserPrivateModule, path: 'private' },
        ]),
    ]
})
export default class PrivateModule { }
