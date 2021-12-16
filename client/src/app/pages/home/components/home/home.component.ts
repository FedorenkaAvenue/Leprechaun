import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SelectionProductType } from '@shared/enums';
import { ProductDetailsI, ProductsBaseI, ProductsCommonI, ProductsPreviewI } from '@shared/models';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public popularProducts: Observable<ProductsPreviewI[]>;
  public newProducts: Observable<ProductsPreviewI[]>;
  public products$: Observable<ProductsCommonI>;
  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.products$ = this.getProducts();
    this.popularProducts = this.getPopularProducts();
    this.newProducts = this.getNewProducts();
  }

  private getPopularProducts(): Observable<ProductsPreviewI[]> {
    return this.products$.pipe(map((res: ProductsCommonI) => res.popular));
  }

  private getNewProducts(): Observable<ProductsPreviewI[]> {
    return this.products$.pipe(map((res: ProductsCommonI) => res.newest));
  }

  private getProducts(): Observable<ProductsCommonI> {
    return this.homeService.getSelectionProducts();
  }
}
