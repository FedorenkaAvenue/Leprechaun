import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpchInputComponent } from './components/lpch-input/lpch-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LpchInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LpchInputComponent
  ]
})
export class LpchInputModule { }
