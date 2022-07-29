import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpchImageComponent } from './lpch-image.component';
import { DefaultImageModule } from '../../directives/default-image/default-image.module';



@NgModule({
  declarations: [
    LpchImageComponent
  ],
  imports: [
    CommonModule,
    DefaultImageModule
  ],
  exports: [LpchImageComponent]
})
export class LpchImageModule { }
