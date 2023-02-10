import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationForm } from './translation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    TranslationForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [ 
    TranslationForm
  ]
})
export class TranslationFormModule { }
