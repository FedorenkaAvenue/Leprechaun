import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import WishlistItemEntity from '@entities/WishlistItem';
import WishlistEntity from '@entities/Wishlist';
import ConfigService from '@services/Config';

@Injectable()
export default class WishlistService {
    protected readonly wishlistLength: number;

    constructor(
        @InjectRepository(WishlistEntity) public readonly wishlistRepo: Repository<WishlistEntity>,
        @InjectRepository(WishlistItemEntity) public readonly wishlistItemRepo: Repository<WishlistItemEntity>,
        private readonly configService: ConfigService,
    ) {
        this.wishlistLength = Number(this.configService.getVal('USER_WISHLIST_LENGTH'));
    }
}
