import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import AuthPrivateModule from "./services/auth/auth.module";
import UserPrivateModule from "./services/user/user.module";
import PropertyGroupPrivateModule from "./services/propertyGroup/propertyGroup.module";
import PropertyPrivateModule from "./services/property/property.module";
import CategoryPrivateModule from "./services/category/category.module";
import ProductPrivateModule from "./services/product/product.module";

@Module({
    imports: [
        AuthPrivateModule,
        PropertyGroupPrivateModule,
        PropertyPrivateModule,
        UserPrivateModule,
        CategoryPrivateModule,
        ProductPrivateModule,
        RouterModule.register([
            { module: AuthPrivateModule, path: 'private' },
            { module: PropertyGroupPrivateModule, path: 'private' },
            { module: PropertyPrivateModule, path: 'private' },
            { module: UserPrivateModule, path: 'private' },
            { module: CategoryPrivateModule, path: 'private' },
            { module: ProductPrivateModule, path: 'private' },
        ]),
    ]
})
export default class PrivateModule { }
