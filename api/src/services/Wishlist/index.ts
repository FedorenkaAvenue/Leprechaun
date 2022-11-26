import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import WishlistItemEntity from '@entities/WishlistItem';

@Injectable()
export default class WishlistService {
    constructor(
        @InjectRepository(WishlistItemEntity) public readonly wishlistItemRepo: Repository<WishlistItemEntity>,
    ) {}
}
