import { ProductStatus } from '@shared/enums/product-status.enum';
import { ProductLabelI } from './product-label.model';
import { PriceI } from './product-price.model';


export interface ProductPreviewI {
  id: string;
  title: string;
  status: ProductStatus;
  price: PriceI;
  image: string;
  labels: Array<ProductLabelI>;
}