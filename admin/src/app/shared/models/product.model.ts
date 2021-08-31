import { PaginationDto } from "./pagination.model";

export interface ProductCardI {
    id?: number,
    title: string,
    price: number,
    category: string,
    images: Array<ImageI>;
    isPublic: boolean,
  }
  
  export interface ImageI {
    id: string;
    src: string;
  }

  export interface Products {
    result: ProductCardDto[],
    pagination: PaginationDto
  }
  
  export class ProductCardDto implements ProductCardI {
      public id?: number;
      public title: string;
      public price: number;
      public category: string;
      public images: Array<ImageI>;
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
  