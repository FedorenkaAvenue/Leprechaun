export interface ProductCardI {
    id: number,
    title: string,
    price: number,
    category: string
  }
  
  export class ProductCardDto implements ProductCardI {
      public id: number;
      public title: string;
      public price: number;
      public category: string;
    constructor(
      data: ProductCardI
    ) {
        const {id, title, price, category} = data
        this.id = id,
        this.title = title,
        this.price = price,
        this.category = category
    }
  }
  