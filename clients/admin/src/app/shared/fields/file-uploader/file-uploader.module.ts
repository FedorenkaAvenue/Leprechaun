import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { LpchImageModule } from '../../components/lpch-image/lpch-image.module';



@NgModule({
  declarations: [
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    LpchImageModule
  ],
  exports: [
    FileUploaderComponent
  ]
})
export class FileUploaderModule { }
