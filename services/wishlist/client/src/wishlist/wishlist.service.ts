import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { from, Observable, of, switchMap } from "rxjs";

import WishlistEntity from "./wishlist.entity";
import { WishlistPublic } from "gen/wishlist";
import { User } from "gen/user";
import ProductService from "@common/product/product.service";
import WishlistMapper from "./wishlist.mapper";
import { QueryCommonParams } from "gen/common";

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishlistEntity) private readonly wishlistRepo: Repository<WishlistEntity>,
        private readonly productService: ProductService,
    ) { }

    public getWishlistListPublic(userId: User['id'], queries: QueryCommonParams): Observable<WishlistPublic[]> {
        return from(this.wishlistRepo.findBy({ user: userId })).pipe(
            switchMap(wishlists => {
                if (!wishlists.length) return of([]);

                return this.productService.getProductListPublic(
                    wishlists.map(wishlist => wishlist.items.map(item => item.product)).flat(),
                    queries,
                ).pipe(
                    switchMap(products => {
                        return of(wishlists.map(wishlist => WishlistMapper.toPublicView(wishlist, products)));
                    })
                )
            })
        );
    }
}
