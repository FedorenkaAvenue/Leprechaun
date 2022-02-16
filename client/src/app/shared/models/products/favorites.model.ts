import { ProductPreviewBaseI } from '.';

export interface FavoriteItemI extends ProductPreviewBaseI {
  image: string;
  inCard?: boolean;
}
