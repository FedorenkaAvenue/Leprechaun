import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { PropertiesGroupDto } from 'src/app/shared/models/properties.model';
import { environment } from 'src/environments/environment.global';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFormComponent implements OnInit {

  @Output() saveFormEvent = new EventEmitter<any>();
  @Input() categoryData: CategoryDto;
  @Input() propertiesGroups: PropertiesGroupDto[] | null;
  
  public languages = environment.langs.split(',');

  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm() {
    this.form = this.fb.group({
      url: this.fb.control(null, Validators.required),
      title: this.fb.control(null, Validators.required),
      propertygroups: this.fb.control(null, Validators.required),
      is_public: this.fb.control(true),
      icon: this.fb.control(null, Validators.required),
    })
  }

  ngOnChanges(changes: SimpleChange): void {
    if ('categoryData' in changes) {
      this.updateForm(this.categoryData);
    }
  }

  private updateForm(data: CategoryDto) {
    this.form.patchValue(data);    
  }

  public uploadFiles(files: any) {
    this.form.get('icon')?.setValue(files[0]);
  }

  public saveForm() {
    const data = this.form.value;
    this.saveFormEvent.emit(data)
  }
}
