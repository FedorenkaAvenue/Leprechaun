import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpchTabsComponent } from './lpch-tabs.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LpchTabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LpchTabsComponent
  ]
})
export class LpchTabsModule { }
