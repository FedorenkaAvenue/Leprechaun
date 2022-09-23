import { OrderDto } from "../order";
import { FavoritesI } from "../products/favorites.model";

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
