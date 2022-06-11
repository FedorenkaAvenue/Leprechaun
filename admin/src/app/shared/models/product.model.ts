import { PaginationDto } from './pagination.model';

export enum AvailabilityStatus
{
  AVAILABLE = 1,
  OUT_OF_STOCK
}
export interface imageDto {
  id: string;
  src: string;
}
export interface ProductCardI {
  id?: number;
  title: string;
  price: number;
  category: string;
  images: Array<imageDto>;
  isPublic: boolean;
}
export interface Products {
  data: ProductCardDto[];
  images: Array<ImageI>;
  isPublic: boolean;
}

export interface ImageI {
  id: string;
  src: string;
}

export interface Products {
  result: ProductCardDto[];
  pagination: PaginationDto;
}

export class ProductCardDto implements ProductCardI {
  public id?: number;
  public title: string;
  public price: number;
  public category: string;
  public images: Array<ImageI>;
  public isPublic: boolean;
  constructor(data: ProductCardI) {
    const { id, title, price, category, images, isPublic } = data;
    (this.id = id),
    (this.title = title),
    (this.price = price),
    (this.category = category),
    (this.images = images || []),
    (this.isPublic = isPublic);
  }
}

export class ProductPayloadDto {
  public title: string;
  public price_current: number;
  public price_old?: number;
  public is_public: boolean;
  public status: AvailabilityStatus;
  public description: string;
  public category: number;
  public labels: any[];
  public properties: any[];
  public comment: string;
  public images: Array<File>;
} 

