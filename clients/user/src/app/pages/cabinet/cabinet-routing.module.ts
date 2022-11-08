import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './componennts/cabinet/cabinet.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      // {
      //   path: 'wishlist',
      //   loadChildren: () => import('./pages/cabinet-wishlist/cabinet-wishlist.module').then( (module) => module.CabinetWishlistModule)
      // },
      {
        path: 'wishlist',
        loadChildren: () => import('./pages/cabinet-wishlist/cabinet-wishlist.module').then( (module) => module.CabinetWishlistModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/cabinet-orders/cabinet-orders.module').then( (module) => module.CabinetOrdersModule)
      },
      {
        path: 'viewed',
        loadChildren: () => import('./pages/cabinet-viewed/cabinet-viewed.module').then( (module) => module.CabinetViewedModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
