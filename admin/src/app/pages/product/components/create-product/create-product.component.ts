import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { ProductsService } from '../../sevices/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public categories$: Observable<CategoryDto[]>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.categories$ = this.getCategories();
  }

  public saveForm(formData: any) {
    this.productsService.createProduct(formData).subscribe(res => {
      console.log(res);
     this.router.navigate(['/admin/categories'])
    });
  }

  private getCategories(): Observable<CategoryDto[]> {
    return this.productsService.getCategories();
  }
  
}
