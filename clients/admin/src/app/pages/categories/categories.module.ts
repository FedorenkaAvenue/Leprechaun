import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';
import { CategoriesService } from './services/categories.service';
import { DefaultImageModule } from 'src/app/shared/directives/default-image/default-image.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryPreviewCardComponent } from './components/category-preview-card/category-preview-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModalModule } from 'src/app/shared/modules/modal/modal.module';
import { FileUploaderModule } from 'src/app/shared/fields/file-uploader/file-uploader.module';
import { CategoryPersonalPageComponent } from './components/category-personal-page/category-personal-page.component';
import { ProductsListModule } from 'src/app/shared/components/products-list/products-list.module';
import { PaginatorModule } from 'src/app/shared/modules/paginator';
import { ProductsService } from '../product/sevices/products.service';
import { ProductsApiService } from 'src/app/shared/services/products/products-api.service';
import { LpchImageModule } from 'src/app/shared/components/lpch-image/lpch-image.module';

@NgModule({
  declarations: [
    CategoriesPageComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CategoryPreviewCardComponent,
    CategoryPersonalPageComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    DefaultImageModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ModalModule,
    FileUploaderModule,
    ProductsListModule,
    PaginatorModule,
    LpchImageModule
  ],
  providers: [
    CategoriesApiService,
    CategoriesService,
    ProductsService,
    ProductsApiService,
  ],
})
export class CategoriesModule {}
