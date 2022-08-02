import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderFieldComponent } from './slider-field.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SliderFieldComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatInputModule,
    FormsModule
  ],
  exports: [SliderFieldComponent]
})
export class SliderFieldModule { }
