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
  public categoryControl = new FormControl(null)
  constructor( private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.form = this.fb.group({
      price: this.fb.control(null, Validators.required),
      title: this.fb.control(null, Validators.required),
      category: this.categoryControl,
    })
  }
  
  public saveForm() {
    const data = this.form.value;
    this.saveFormEvent.emit(data)
  }

}
