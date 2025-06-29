import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

import { User } from "gen/user";
import { Wishlist, WishlistCreate, WishlistUpdate, WishlistUpdate_Updates } from "gen/wishlist";

export class WishlistCreateDTO implements WishlistCreate {
    @IsNotEmpty()
    @IsString()
    title: Wishlist['title'];

    @IsOptional()
    @IsBoolean()
    isDefault: Wishlist['isDefault']

    @IsNotEmpty()
    @IsString()
    user: User['id'];
}

class WishlistUpdatesDTO implements WishlistUpdate_Updates {
    @IsOptional()
    @IsBoolean()
    isDefault: Wishlist['isDefault']

    @IsOptional()
    @IsString()
    title: Wishlist['title'];
}

export class WishlistUpdateDTO implements WishlistUpdate {
    @IsObject()
    @ValidateNested()
    @Type(() => WishlistUpdatesDTO)
    updates: WishlistUpdate['updates'];

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    wishlist: Wishlist['id'];

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    user: User['id'];
}
