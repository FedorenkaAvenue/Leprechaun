import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsI } from '@shared/models';
import { Observable, Subscription } from 'rxjs';
import { threadId } from 'worker_threads';
import { ProductPageService } from '../../services/product-page.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit, OnDestroy {
  public productDetails: ProductDetailsI;
  private subscription: Subscription;
  constructor(
    private readonly productPageService: ProductPageService,
    private readonly route: ActivatedRoute,
  ) {
    this.productPageService.init();
  }

  ngOnInit(): void {
    this.subscription = this.getProduct().subscribe((product: ProductDetailsI) => {
      this.productDetails = product;
      this.productPageService.setProduct(product);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.productPageService.destroy();
  }

  private getProductId(): string {
    return this.route.snapshot.params.id;
  }

  private getProduct(): Observable<ProductDetailsI> {
    const id = this.getProductId();
    return this.productPageService.getProductDetails(id);
  }

}
