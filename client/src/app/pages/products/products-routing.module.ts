import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { ProductsPageComponent } from './components/products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
