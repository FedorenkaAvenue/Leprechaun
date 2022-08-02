import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsI } from '@shared/models';
import { Observable } from 'rxjs';
import { threadId } from 'worker_threads';
import { ProductPageService } from '../../services/product-page.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {

  public productDetails$: Observable<ProductDetailsI>;

  constructor(
    private readonly productPageService: ProductPageService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productDetails$ = this.getProduct();
  }

  private getProductId(): string {
    return this.route.snapshot.params.id;
  }

  private getProduct(): Observable<ProductDetailsI> {
    const id = this.getProductId();
    return this.productPageService.getProductDetails(id);
  }
}
