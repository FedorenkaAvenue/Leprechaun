import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetailsI } from '@shared/models';
import { ProductPageApiService } from '@shared/services/product-page-api/product-page-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductPageService {
  constructor(
    private readonly productPageApiService: ProductPageApiService
    ) {}

    public getProductDetails(id: string): Observable<ProductDetailsI> {
      return this.productPageApiService.getProduct(id);
    }
}
