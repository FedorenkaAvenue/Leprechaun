import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import WishlistEntity from "./wishlist.entity";

@Module({
    imports: [TypeOrmModule.forFeature([WishlistEntity])],
    exports: [TypeOrmModule],
})
export default class WishlistModule { }
