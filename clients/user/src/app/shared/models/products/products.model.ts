import { PriceI } from '.';
import { CategoryI } from '../categories/categories.model';
import { PaginationDto } from '../pagination/pagination.model';
import { ProductLabelI } from './product-label.model';

export interface ProductCardImageI {
  id: string;
  src: string;
}

export interface ProductImageI {
  id: number;
  src: string;
  product_id: string;
}

export interface ProductPropertiesI {
  id: string;
  title: string;
  alt_name: string;
  comment: string;
  property_group: ProductPropertiesGroupI;
}

export interface ProductPropertiesGroupI {
  id: number;
  title: string;
  alt_name: string;
}
export interface ProductsPreviewI extends ProductPreviewBaseI {
  image: string;
}

export interface ProductsBaseI {
  id: string;
  created_at: string;
  title: string;
  is_public: boolean;
  is_available: boolean;
  price: PriceI;
  images: Array<ProductImageI>;
  image?: string;
  labels: Array<ProductLabelI>;
  rating: number;
  description: string;
  status: number;
  orderCount: number;
  wishlistCount: number;
  comment?: string;
}

export interface DasboardCommonProductsI {
  popular: ProductsPreviewI[];
  newest: ProductsPreviewI[];
}

export interface DasboardUserProductsI {
  history: ProductsPreviewI[];
}
export interface ProductDetailsI extends ProductsBaseI {
  properties: Array<ProductPropertiesI>;
  category: CategoryI;
}

export interface ProductCardI extends ProductDetailsI {}

export interface Products {
  data: ProductCardI[];
  pagination: PaginationDto;
}

export class ProductPreviewBaseI {
  id: string;
  title: string;
  price: PriceI;
  status: number;
  isFavorite: boolean;
  inCart: boolean;
  favoriteId: string;
  labels: Array<ProductLabelI>;
}

export class ProductCardI extends ProductPreviewBaseI {
  category: CategoryI;
  images: Array<ProductImageI>;
  labels: Array<ProductLabelI>;
  properties: Array<ProductPropertiesI>;
  isFavorite: boolean;
  inCart: boolean;
  favoriteId: string;
}

