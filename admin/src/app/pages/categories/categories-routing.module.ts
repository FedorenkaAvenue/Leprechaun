import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent
  },
  {
    path: 'add',
    component: CreateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
