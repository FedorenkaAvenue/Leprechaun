import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductDetailsI } from '@shared/models';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';
import { ProductPageService } from '../../services/product-page.service';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPhotosComponent {
  public mediaEndpoint = environment.mediaEndpoint;

  
  public productDetails$: Observable<ProductDetailsI>;

  constructor(
    private readonly productPageService: ProductPageService,
) { }

  ngOnInit(): void {
    this.productDetails$ = this.productPageService.product$;
  }

}
