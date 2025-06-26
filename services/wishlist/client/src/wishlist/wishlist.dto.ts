import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

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

    @Optional()
    @IsString()
    title: Wishlist['title'];
}

export class WishlistUpdateDTO implements WishlistUpdate {
    @IsObject()
    @ValidateNested()
    @Type(() => WishlistUpdatesDTO)
    updates: WishlistUpdate['updates'];

    @IsNotEmpty()
    @IsString()
    wishlist: string;

    @IsNotEmpty()
    @IsString()
    user: User['id'];
}
