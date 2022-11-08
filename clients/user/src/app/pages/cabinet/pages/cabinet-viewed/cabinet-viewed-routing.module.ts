import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetViewedComponent } from './components/cabinet-viewed.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetViewedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetViewedRoutingModule { }
