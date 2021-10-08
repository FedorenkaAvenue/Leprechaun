import { PaginationDto } from "./pagination.model";

<<<<<<< HEAD
export interface imageDto {
  id: string;
  src: string;
}

=======
>>>>>>> product-card
export interface ProductCardI {
    id?: number,
    title: string,
    price: number,
    category: string,
<<<<<<< HEAD
    images: Array<imageDto>;
    isPublic: boolean,
  }
  
  export interface Products {
    data: ProductCardDto[],
=======
    images: Array<ImageI>;
    isPublic: boolean,
  }
  
  export interface ImageI {
    id: string;
    src: string;
  }

  export interface Products {
    result: ProductCardDto[],
>>>>>>> product-card
    pagination: PaginationDto
  }
  
  export class ProductCardDto implements ProductCardI {
      public id?: number;
      public title: string;
      public price: number;
      public category: string;
<<<<<<< HEAD
      public images: Array<imageDto>;
=======
      public images: Array<ImageI>;
>>>>>>> product-card
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
  