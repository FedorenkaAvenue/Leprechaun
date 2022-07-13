import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    FileUploaderComponent
  ]
})
export class FileUploaderModule { }
