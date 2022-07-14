import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelValuePipe } from './label-value.pipe';

@NgModule({
  declarations: [LabelValuePipe],
  imports: [CommonModule],
  exports: [LabelValuePipe],
})
export class LabelsValueModule {}
