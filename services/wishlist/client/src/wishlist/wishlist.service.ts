import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from 'typeorm';
import { from, map, Observable, of, switchMap, tap } from "rxjs";
import { status } from "@grpc/grpc-js";
import { RpcException } from "@nestjs/microservices";

import WishlistEntity from "./wishlist.entity";
import { Wishlist, WishlistItemPublic, WishlistPublic, WishlistUpdate_Updates } from "gen/wishlist";
import { User } from "gen/user";
import ProductService from "@common/product/product.service";
import WishlistMapper from "./wishlist.mapper";
import { QueryCommonParams } from "gen/common";
import { WishlistCreateDTO } from "./wishlist.dto";
import { Product } from "gen/product";
import WishlistItemService from "../wishlistItem/wishlistItem.service";

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishlistEntity) private readonly wishlistRepo: Repository<WishlistEntity>,
        private readonly productService: ProductService,
        private readonly wishlistItemService: WishlistItemService,
    ) { }

    public getWishlistPublic(wishlistId: Wishlist['id'], queries: QueryCommonParams): Observable<WishlistPublic> {
        return from(this.wishlistRepo.findOneBy({ id: wishlistId })).pipe(
            switchMap(wishlist => {
                if (!wishlist) throw new RpcException({ code: status.NOT_FOUND, message: 'Wishlist not found' });

                return this.productService.getProductListPublic(wishlist.items.map(({ product }) => product), queries).pipe(
                    map(products => WishlistMapper.toViewPublic(wishlist, products))
                );
            })
        );
    }

    public getWishlistListPublic(userId: User['id'], queries: QueryCommonParams): Observable<WishlistPublic[]> {
        return from(this.wishlistRepo.findBy({ user: userId })).pipe(
            switchMap(wishlists => {
                if (!wishlists.length) return of([]);

                const wishlistsProducts = wishlists.map(wishlist => wishlist.items.map(item => item.product)).flat();

                const products$ = wishlistsProducts.length ?
                    this.productService.getProductListPublic(wishlistsProducts, queries) :
                    of([]);

                return products$.pipe(
                    switchMap(products => {
                        return of(wishlists.map(wishlist => WishlistMapper.toViewPublic(wishlist, products)));
                    })
                )
            })
        );
    }

    public deleteWishlistByUserId(userId: User['id']): Promise<DeleteResult> {
        return this.wishlistRepo.delete({ user: userId });
    }

    public createWishlist(wishlist: WishlistCreateDTO): Observable<WishlistPublic> {
        return from(this.getDefaultWishlist(wishlist.user)).pipe(
            switchMap(defaultWishlist => {
                return from(this.wishlistRepo.save({
                    ...wishlist,
                    isDefault: defaultWishlist ? wishlist.isDefault : true,
                })).pipe(
                    map(wishlist => WishlistMapper.toViewPublic({ ...wishlist, items: [] }, [])),
                    tap(() => { // unset previous default wishlist as not default
                        if (defaultWishlist && wishlist.isDefault) {
                            this.wishlistRepo.update({ id: defaultWishlist.id }, { isDefault: false });
                        }
                    }),
                );
            })
        )
    }

    public updateWishlist(
        id: Wishlist['id'],
        user: User['id'],
        updates: WishlistUpdate_Updates,
    ): Observable<void> {
        const wishlistDefaultSideEffect$ = updates.isDefault
            ? from(this.wishlistRepo.update({ user, isDefault: true }, { isDefault: false }))
            : of();

        return wishlistDefaultSideEffect$.pipe(
            switchMap(() => from(this.wishlistRepo.update({ id, user }, { ...updates })).pipe(
                switchMap(({ affected }) => {
                    if (!affected) {
                        throw new RpcException({
                            code: status.NOT_FOUND,
                            message: `wishlist with id ${id} and user ${user} not found`,
                        });
                    }

                    return of();
                })
            ))
        )
    }

    public addWishlistItemPublic(
        user: User['id'],
        productId: Product['id'],
        queries: QueryCommonParams,
    ): Observable<WishlistItemPublic> {
        return from(this.getDefaultWishlist(user)).pipe(
            switchMap(defaultWishlist => {
                const wishlist$ = defaultWishlist
                    ? of(defaultWishlist)
                    : from(this.wishlistRepo.save({ isDefault: true, user }))

                return wishlist$.pipe(
                    switchMap(wishlist => from(
                        this.wishlistItemService.addWishlistItemPublic(wishlist.id, productId, queries)
                    ))
                )
            })
        );
    }

    public deleteWishlist(id: Wishlist['id'], user: User['id']): Observable<void> {
        return from(this.wishlistRepo.delete({ id, user })).pipe(
            switchMap(({ affected }) => {
                if (!affected) {
                    throw new RpcException({
                        code: status.NOT_FOUND,
                        message: `wishlist with id ${id} and user ${user} not found`,
                    });
                }

                return of();
            })
        );
    }

    /**
     * @description check and get default wishlist
     * @param user user id
     * @returns default wishlist or null if doesn't exist
     */
    private async getDefaultWishlist(user: User['id']): Promise<WishlistEntity | null> {
        return await this.wishlistRepo.findOne({ where: { user, isDefault: true } });
    }
}
