import { ProductStatus } from '@shared/enums/product-status.enum';
import { ProductPreviewI } from './product-preview.model';
import { PriceI } from './product-price.model';

export class FavoritesDto {
  id: string;
  image: string;
  price: PriceI;
  status: ProductStatus;
  title: string;
  inCart?: boolean;
}

export interface FavoritesI extends ProductPreviewI  {
  inCart?: boolean;
}