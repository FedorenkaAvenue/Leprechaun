import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FILTERS } from 'app/mock/filters';

@Component({
  selector: 'app-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
  styleUrls: ['./filter-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCheckboxComponent implements OnInit, OnChanges {
  @Input() list: any = FILTERS[0];
  get listControls() {
    return (this.form.get('list') as FormArray);
  }

  public amd: any
  public form: FormGroup;
  // public form: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.updateForm();
      console.log(this.listControls)

      this.form.valueChanges.subscribe(res => {
      console.log(res);
      
      })
      

      this.amd = {[this.list?.category?.name]: 'asdasd'}
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.list && changes.list.currentValue) {
      console.log(2323);
      
     
    }
  }
  initForm(): void {
    const filterItem = this.fb.group({
      title: this.fb.control(null),
      id: this.fb.control(null),
      selected: this.fb.control(false),
    });
    this.form = this.fb.group({
      list: this.fb.array([]),
    });
  }

  updateForm() {
    const list = (this.form.get('list') as FormArray);
    this.list.items.forEach(element => {
      list.push(this.fb.group({
        title: this.fb.control(element.title),
        id: this.fb.control(element.id),
        selected: this.fb.control(false),
      }))
    });
    // .push(filterItem)
  }
}
