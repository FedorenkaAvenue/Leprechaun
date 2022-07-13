import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
  ],
})
export class FileUploaderComponent implements ControlValueAccessor {
  @Input() multiple = false;
  @Output() changeFiles = new EventEmitter<Array<File>>();
  private reader = new FileReader();

  private _files: Array<File>;

  public filesPreview: Array<string | ArrayBuffer | null | SafeUrl>;

  constructor(
    private cdr: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
    ) {}

  public getFiles(): Array<File> {
    return this._files;
  }

  public setFiles(files: Array<File> | File | FileList): void {
    if (files instanceof File) {
      this._files = [files];
      return;
    }
    if (files instanceof FileList) {
      this._files = Array.from(files);
      return;
    }
    if (Array.isArray(files)) {
      this._files = files;
      return;
    } else {
      this._files = [];
    }
  }

  public uploadFiles(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target?.files) {
      return;
    }
    this.setFiles(target?.files);
    this.changeFiles.emit(this._files);
    this.onChange(this._files);
    this.filesPreview = [];
    this.setFilesPreview();
  }

  private setFilesPreview(): void {
    this.filesPreview = [];
    this.getFiles()?.forEach((item) => {
      console.log(item);

      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = () => {
        // this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(myReader.result);
        const imagePreview = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string);
        console.log(reader.result)
        this.filesPreview.push(imagePreview);
        this.cdr.detectChanges();
      };
    });
  }

  public removeImage(index: number): void {
    const files = this.getFiles();
    files?.splice(index, 1);
    this.setFiles(files);
    this.setFilesPreview();
  }

  onChange(_: any) {}

  writeValue(value: any) {
    this._files = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched() {}
}
