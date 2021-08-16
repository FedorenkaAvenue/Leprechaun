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
    this.form.get('files')?.valueChanges.subscribe(el => {
      console.log(el);
      
    })
  }


  private initForm() {
    this.form = this.fb.group({
      price: this.fb.control(null, Validators.required),
      title: this.fb.control(null, Validators.required),
      category: this.categoryControl,
      isPublic: this.fb.control(true),
      images: this.fb.control([], Validators.required)
    })
  }
  
  public uploadFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.files);
    this.form.get('images')?.setValue(target.files);
    console.log(this.form.value);
  }

  public saveForm() {
    const data = this.form.value;
    this.saveFormEvent.emit(data)
  }

}
