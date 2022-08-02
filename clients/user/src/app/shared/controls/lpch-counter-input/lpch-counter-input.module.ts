import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpchCounterInputComponent } from './components/lpch-counter-input/lpch-counter-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LpchCounterInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LpchCounterInputComponent],
})
export class LpchCounterInputModule {}
