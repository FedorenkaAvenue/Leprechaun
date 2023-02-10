import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { PropertiesGroupDto } from 'src/app/shared/models/properties.model';
import { NavigationService } from 'src/app/shared/services/navigations/navigations.service';
import { ProductsService } from '../../sevices/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public categories$: Observable<CategoryDto[]>;
  public propertiesGroups$: Observable<Array<PropertiesGroupDto>>
  public categoryId: number;
  constructor(
    private readonly productsService: ProductsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.getCategories();
    this.categoryId = this.route.snapshot.queryParams.category
  }

  public saveForm(formData: any) {
    this.productsService.createProduct(formData).subscribe((res) => {
      this.toastr.success('product was created');
      // this.router.navigate();
      this.navigationService.back();

    });
  }

  public changeCategory(id: string) {
    this.getPropertyGroupByCatageryId(id);
  }

  private getPropertyGroupByCatageryId(id: string): void {
    this.propertiesGroups$ = this.productsService.getPropertiesGroupsByCategoryId(id)
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
    'seat',
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
