import { Injectable } from '@angular/core';
import { ProductCardDto, Products } from '@shared/models/products/products.model';
import { ProductsApiService } from '@shared/services/products-api/products-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productsApiService: ProductsApiService
    ) { }

    public getProducts(): Observable<Products> {
      return this.productsApiService.getProducts({});
    }
}
