import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsService } from './sevices/products.service';
import { ProductsApiService } from 'src/app/shared/services/products/products-api.service';
import { DefaultImageModule } from 'src/app/shared/directives/default-image/default-image.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCardModule } from 'src/app/shared/components/product-card/product-card.module';
import { MatSelectModule } from '@angular/material/select';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductFormComponent,
    EditProductComponent,
    CreateProductComponent,
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    DefaultImageModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ProductCardModule,
    MatSelectModule,
    DragDropModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [ProductsService, ProductsApiService, CategoriesApiService],
})
export class ProductModule {}
