import { ProductLabelType } from "@shared/enums/product-label.enum";
import { CategoryI } from "../categories/categories.model";
import { PaginationDto } from "../pagination/pagination.model";

export interface ProductLabelI {
  id: 0,
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

export interface ProductDetailsI {
    id: string,
    created_at: string,
    title: string,
    is_public: boolean,
    is_available: boolean,
    price: number,
    images: Array<ProductImageI>,
    labels: Array<ProductLabelI>,
    rating: 0,
    description: string,
    properties: Array<ProductPropertiesI>,
    category: CategoryI;
}

export interface ProductCardI {
    id?: number,
    title: string,
    price: number,
    category: string,
    images: Array<ProductCardImageI>;
    isPublic: boolean,
  }


  export interface Products {
    data: ProductCardDto[],
    pagination: PaginationDto
  }

  export class ProductCardDto implements ProductCardI {
    public id?: number;
    public title: string;
    public price: number;
    public category: string;
    public images: Array<ProductCardImageI>;
    public isPublic: boolean;
  constructor(
    data: ProductCardI
  ) {
      const {id, title, price, category, images, isPublic} = data
      this.id = id,
      this.title = title,
      this.price = price,
      this.category = category,
      this.images = images || [],
      this.isPublic = isPublic
  }
}

// export class ProductDetailsDto