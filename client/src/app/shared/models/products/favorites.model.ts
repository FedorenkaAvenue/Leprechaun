import { ProductStatus } from '@shared/enums/product-status.enum';
import { PriceI } from './product-price.model';

export class FavoritesDto {
  id: string;
  image: string;
  price: PriceI;
  status: ProductStatus;
  title: string;
  inCard?: boolean;
}
