import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import('../../../pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../../../pages/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../../../pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../../../pages/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'properties',
        loadChildren: () => import('../../../pages/properties/properties.module').then(m => m.PropertiesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrapperRoutingModule { }
