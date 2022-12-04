import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { ProductAboutComponent } from './components/product-about/product-about.component';
import { ProductCharacteristicsComponent } from './components/product-characteristics/product-characteristics.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductPhotosComponent } from './components/product-photos/product-photos.component';

const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'about-product',
        pathMatch: 'full'
      },
      {
        path: 'about-product',
        component: ProductAboutComponent
      },
      {
        path: 'characteristics',
        component: ProductCharacteristicsComponent
      },
      {
        path: 'photo',
        component: ProductPhotosComponent
      },
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPageRoutingModule { }
