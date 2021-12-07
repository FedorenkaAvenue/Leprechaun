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
  id: string;
  src: string;
  product_id: string;
}

export interface ProductPropertiesI {
  id: 0,
  title: string,
  alt_name: string,
  comment: string,
  property_group: any
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
  popular: ProductsBaseI[],
  newest: ProductsBaseI[]
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
  }

  export class ProductCardDto extends ProductDetailsDto implements ProductCardI {
}

// export class ProductDetailsDto