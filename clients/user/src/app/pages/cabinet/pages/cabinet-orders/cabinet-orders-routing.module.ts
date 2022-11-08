import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetOrdersComponent } from './componets/cabinet-orders/cabinet-orders.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetOrdersRoutingModule {}
