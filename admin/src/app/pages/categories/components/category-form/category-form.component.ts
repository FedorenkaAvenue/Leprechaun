import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Output() saveFormEvent = new EventEmitter<any>();
  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      url: this.fb.control(null, Validators.required),
      title: this.fb.control(null, Validators.required),
    })
  }

  public saveForm() {
    const data = this.form.value;
    this.saveFormEvent.emit(data)
    
  }
}
