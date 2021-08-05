import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  public form: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

  private initForm() {
    this.form
  }
}
