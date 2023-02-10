import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueDefaultTranslationPipe } from './value-default-translation.pipe';



@NgModule({
  declarations: [
    ValueDefaultTranslationPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ValueDefaultTranslationPipe]
})
export class ValueDefaultTranslationModule { }
