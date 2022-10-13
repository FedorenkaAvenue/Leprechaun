import { FavoritesI, OrderDto } from "../products";


export interface UserI {
  cart: OrderDto;
  session: string;
  wishlist: Array<FavoritesI>;
}

export class User {
  cart: OrderDto;
  session: string;
  wishlist: Array<FavoritesI>;
}