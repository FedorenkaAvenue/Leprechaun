import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public form: FormGroup;
  public categoryControl = new FormControl(null, Validators.required)
  constructor( private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.form = this.fb.group({
      price_current: this.fb.control(null, Validators.required),
      title: this.fb.control(null, Validators.required),
      category: this.categoryControl,
      is_public: this.fb.control(true),
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
