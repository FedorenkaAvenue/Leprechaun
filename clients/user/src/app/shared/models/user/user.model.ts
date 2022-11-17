import { FavoriteDto, FavoritesI, OrderDto } from "../products";


export interface UserI {
  cart: OrderDto;
  session: string;
  wishlist: Array<FavoriteDto>;
}

export class User {
  cart: OrderDto;
  session: string;
  wishlist: Array<FavoriteDto>;
}