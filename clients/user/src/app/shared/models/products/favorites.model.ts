import { ProductLabelType } from '@shared/enums';
import { ProductStatus } from '@shared/enums/product-status.enum';
import { ProductLabelI } from './product-label.model';
import { ProductPreviewI } from './product-preview.model';
import { PriceI } from './product-price.model';

export class FavoriteProductDto {
  id: string;
  image: string;
  price: PriceI;
  status: ProductStatus;
  title: string;
  labels: Array<ProductLabelI>
  inCart?: boolean;
}

export class FavoriteDto {
    id: string;
    created_at: string;
    product: FavoriteProductDto
}

export interface FavoritesI extends ProductPreviewI  {
  inCart?: boolean;
}