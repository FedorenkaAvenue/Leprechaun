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


@NgModule({
  declarations: [
    CategoriesPageComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    DefaultImageModule
  ],
  providers: [
    CategoriesApiService,
    CategoriesService
  ]
})
export class CategoriesModule { }
