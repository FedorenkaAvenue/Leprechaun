import { ProductLabelType } from '@shared/enums';
import { PriceI } from '.';
import { CategoryI } from '../categories/categories.model';
import { PaginationDto } from '../pagination/pagination.model';

export interface ProductLabelI {
  id: string;
  type: ProductLabelType;
  value: string;
}

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
  property_group: any;
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
  labels: Array<ProductLabelI>;
  rating: number;
  description: string;
  comment?: string;
}

export interface ProductsCommonI {
  popular: ProductsPreviewI[];
  newest: ProductsPreviewI[];
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
}
export class ProductCardI extends ProductPreviewBaseI {
  category: CategoryI;
  images: Array<ProductImageI>;
  labels: Array<ProductLabelI>;
  properties: Array<ProductPropertiesI>;
  isFavorite: boolean;
  inCard: boolean;
}

