import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductDetailsI } from '@shared/models';
import { Observable } from 'rxjs';
import { ProductPageService } from '../../services/product-page.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCharacteristicsComponent implements OnInit {

  public productDetails$: Observable<ProductDetailsI>;

  
  constructor(
      private readonly productPageService: ProductPageService,
  ) { }

  ngOnInit(): void {
    this.productDetails$ = this.productPageService.product$;
  }

}
