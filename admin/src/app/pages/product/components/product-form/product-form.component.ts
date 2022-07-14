import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryDto } from 'src/app/shared/models/categories.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Output() saveFormEvent = new EventEmitter<any>();
  @Input() categories: CategoryDto[] | null;
  @Input() mode: CategoryDto[] | null;
  @ViewChild('fileInput') fileInput: ElementRef; 
  public form: FormGroup;
  public categoryControl = new FormControl(null, Validators.required);
  public previewImages: string[] = [];
  constructor( private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.form.get('images')?.valueChanges.subscribe(res => {
      
      this.previewImages = [];
      const list = [...res]
      list.forEach((el: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(el);
        reader.addEventListener("load", (event) => {
          const url = event?.target?.result as string;
          this.previewImages.push(url);
        });
      })
    })
  }

public removeProductImage(index: number): void {
  const control = this.form.get('images');
  const fileList = [...control?.value];
  control?.patchValue(fileList.splice(index, 1));
  control?.updateValueAndValidity();

}

  private initForm() {
    this.form = this.fb.group({
      price_current: this.fb.control(null, Validators.required),
      price_old: this.fb.control(null),
      title: this.fb.control(null, Validators.required),
      category: this.categoryControl,
      is_public: this.fb.control(true),
      rating: this.fb.control(null),
      is_new: this.fb.control(true),
      images: this.fb.control([], Validators.required)
    })
  }
  
  public uploadFiles(files: any) {
    this.form.get('images')?.setValue(files);
  }

  public saveForm() {
    const data = this.form.value;
    this.saveFormEvent.emit(data)
  }

}
