import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './shared/modules/wrapper/wrapper.component';

const routes: Routes = [
 {
   path: 'admin',
   loadChildren: () => import('./shared/modules/wrapper/wrapper.module').then(m => m.WrapperModule)
 },
 {
   path: '',
   redirectTo: 'admin',
   pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
