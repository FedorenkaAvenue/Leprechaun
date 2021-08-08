import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent
  },
  {
    path: 'add',
    component: CreateCategoryComponent
  },
  {
    path: 'edit/:url',
    component: EditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
