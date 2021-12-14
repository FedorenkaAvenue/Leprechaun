import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpchSelectComponent } from './components/lpch-select/lpch-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    LpchSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    LpchSelectComponent
  ]
})
export class LpchSelectModule { }
