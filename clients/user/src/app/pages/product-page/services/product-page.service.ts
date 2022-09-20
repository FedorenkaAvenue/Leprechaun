import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetailsI } from '@shared/models';
import { ProductPageApiService } from '@shared/services/api_es/product-page-api/product-page-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductPageService {

  public product$: BehaviorSubject<ProductDetailsI | null>
  constructor(
    private readonly productPageApiService: ProductPageApiService
    ) {}

    public getProductDetails(id: string): Observable<ProductDetailsI> {
      return this.productPageApiService.getProduct(id);
    }

    public init(): void {
      this.product$ = new BehaviorSubject(null);
    }

    public destroy(): void {
      this.product$.complete();
    }

    public setProduct(product: ProductDetailsI): void {
      this.product$.next(product)
    }
}
