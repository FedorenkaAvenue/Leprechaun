import { ProductsSort } from "@shared/enums/sort.enum";
import { Sorting } from "@shared/models/filters/filters.model";

export const SORTING: Array<Sorting> = [
    {
        name: 'Popular',
        id: ProductsSort.POPULAR,
      },
      {
        name: 'Price up',
        id: ProductsSort.PRICE_UP,
      },
      {
        name: 'Price down',
        id: ProductsSort.PRICE_DOWN,
      },
      {
        name: 'New',
        id: ProductsSort.NEW,
      }
]