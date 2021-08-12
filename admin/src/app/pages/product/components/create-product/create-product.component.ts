import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  ) {
  }

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
  
  items = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
    'audi',
    'Mercedes',
    'vW',
    'seat'
  ];

  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event);
  //   moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  // }

  entered(event: CdkDragEnter) {
    moveItemInArray(this.items, event.item.data, event.container.data);
    console.log(this.items);
    
  }
}