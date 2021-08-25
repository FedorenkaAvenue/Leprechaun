import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductCardDto } from '@shared/models/products/products.model';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageComponent implements OnInit {

  public productsCount = 1019;
  public productsList$: Observable<ProductCardDto[]>
  constructor(private readonly productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsList$ = this.productsService.getProducts();
  }

}
