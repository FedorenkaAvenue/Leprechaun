import { ProductLabelType } from "@shared/enums";
import { CategoryI } from "../categories/categories.model";
import { PaginationDto } from "../pagination/pagination.model";



export interface ProductLabelI {
  id: string,
  type: ProductLabelType,
  value: string
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
  id: string,
  title: string,
  alt_name: string,
  comment: string,
  property_group: any
}

export interface ProductsPreviewI {
  id: string,
  title: string,
  price: number,
  images: string,
  status: number
}

export interface ProductsBaseI {
  id: string,
  created_at: string,
  title: string,
  is_public: boolean,
  is_available: boolean,
  price: number,
  images: Array<ProductImageI>,
  labels: Array<ProductLabelI>,
  rating: number,
  description: string,
  comment?: string
}

export interface ProductsCommonI {
  popular: ProductsPreviewI[],
  newest: ProductsPreviewI[]
}


export interface ProductDetailsI extends ProductsBaseI {
    properties: Array<ProductPropertiesI>,
    category: CategoryI;
}



export interface ProductCardI extends ProductDetailsI {
  }


  export interface Products {
    data: ProductCardDto[],
    pagination: PaginationDto
  }

  export class ProductDetailsDto implements ProductDetailsI {
    id: string;
    created_at: string;
    title: string;
    is_public: boolean;
    is_available: boolean;
    price: number;
    images: Array<ProductImageI>;
    labels: Array<ProductLabelI>;
    rating: 0;
    description: string;
    properties: Array<ProductPropertiesI>;
    category: CategoryI;
    inCard: boolean;
    isFavorite: boolean;
  }

  export class ProductCardDto extends ProductDetailsDto implements ProductCardI {
}

// export class ProductDetailsDto