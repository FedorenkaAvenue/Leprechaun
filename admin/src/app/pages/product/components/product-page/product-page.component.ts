import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductCardDto } from 'src/app/shared/models/product.model';
import { ProductsService } from '../../sevices/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public products$: Observable<ProductCardDto[]>;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService
    ) { }

  ngOnInit(): void {
   this.getProducts();
   this.products$.subscribe(res => {
     console.log(res);
     
   })
  }

  private getCategoryUrl(): string | null {
    return this.route.snapshot.paramMap.get('url')
  }

  private getProducts(): void {
    const url = this.getCategoryUrl();
    if(!url) {
      return;
    }
    this.products$ = this.productsService.getProductsList(url);
  }

  public deleteProducts(id: number): void {
    
  }
}
