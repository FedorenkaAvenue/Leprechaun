import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { forkJoin, from, map, Observable, of, switchMap } from "rxjs";
import { RpcException } from "@nestjs/microservices";
import { status } from "@grpc/grpc-js";

import WishlistItemEntity from "./wishlistItem.entity";
import { Product } from "gen/product";
import { QueryCommonParams } from "gen/common";
import { Wishlist, WishlistItem, WishlistItemPublic } from "gen/wishlist";
import WishlistItemMapper from "./wishlistItem.mapper";
import ProductService from "@common/product/product.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import WishlistEntity from "src/wishlist/wishlist.entity";
import { User } from "gen/user";

@Injectable()
export default class WishlistItemService {
    constructor(
        @InjectRepository(WishlistItemEntity) private readonly wishlistItemRepo: Repository<WishlistItemEntity>,
        private readonly productService: ProductService,
    ) { }

    public addWishlistItemPublic(
        wishlist: Wishlist['id'],
        productId: Product['id'],
        queries: QueryCommonParams,
    ): Observable<WishlistItemPublic> {
        return from(this.wishlistItemRepo.upsert(
            { product: productId, wishlist } as DeepPartial<WishlistItemEntity>,
            {
                conflictPaths: { product: true, wishlist: true },
                skipUpdateIfNoValuesChanged: true,
            }
        )).pipe(
            switchMap(({ raw }) => {
                if (raw.length === 0) {
                    throw new RpcException({
                        status: status.ALREADY_EXISTS,
                        message: 'wishlist item already exists',
                    });
                }

                return forkJoin([
                    this.wishlistItemRepo.findOne({ where: { id: raw[0].id } }),
                    this.productService.getProductPreviewPublic(productId, queries),
                ]).pipe(
                    map(([wishlistItem, product]) => WishlistItemMapper.toViewPublic(
                        wishlistItem as WishlistItemEntity,
                        product,
                    ))
                );
            })
        );
    }

    public deleteWishlistItem(id: WishlistItem['id'], user: User['id']): Observable<void> {
        return from(this.wishlistItemRepo.findOneBy({ id, wishlist: { user } })).pipe(
            switchMap(wishlistItem => {
                if (!wishlistItem) {
                    throw new RpcException({
                        code: status.PERMISSION_DENIED,
                        message: `wishlist item with id ${id} and user ${user} not found`,
                    });
                }

                return from(this.wishlistItemRepo.delete({ id })).pipe(
                    switchMap(({ affected }) => of(undefined))
                )
            })
        )
    }

    public moveWishlistItems(wishlist: Wishlist['id'], item: WishlistItem['id']): Observable<void> {
        return from(this.wishlistItemRepo.update(
            { id: item },
            { wishlist } as QueryDeepPartialEntity<WishlistItemEntity>,
        )).pipe(
            switchMap(({ affected }) => {
                if (!affected) {
                    throw new RpcException({
                        code: status.NOT_FOUND,
                        message: `wishlist item or wishlist is not exists`,
                    });
                }

                return of(undefined);
            })
        )
    }

    // for product deleted event
    public deleteItemByProductId(productId: Product['id']): Promise<DeleteResult> {
        return this.wishlistItemRepo.delete({ product: productId });
    }
}
