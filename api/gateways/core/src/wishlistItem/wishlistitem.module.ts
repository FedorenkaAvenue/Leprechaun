import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistItemEntity from "./wishlistItem.entity";

@Module({
    imports: [TypeOrmModule.forFeature([WishlistItemEntity])],
    exports: [TypeOrmModule],
})
export default class WishlistItemModule { }
