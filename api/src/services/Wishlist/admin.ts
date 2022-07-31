import { Injectable } from '@nestjs/common';
import WishlistHelperService from './helper';

@Injectable()
export default class WishlistAdmin extends WishlistHelperService {}
