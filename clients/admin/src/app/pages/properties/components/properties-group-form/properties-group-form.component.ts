import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PropertiesGroupDto,
  PropertiesGroupPayload,
} from 'src/app/shared/models/properties.model';
import { environment } from 'src/environments/environment.global';

@Component({
  selector: 'app-properties-group-form',
  templateUrl: './properties-group-form.component.html',
  styleUrls: ['./properties-group-form.component.scss'],
})
export class PropertiesGroupFormComponent implements OnInit {
  @Output() saveFormEvent = new EventEmitter<PropertiesGroupPayload>();
  @Input() propertiesGroupData: PropertiesGroupDto;

  public languages = environment.langs.split(',');
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    const lang = environment.langs.split(',');
  }

  private initForm() {
    this.form = this.fb.group({
      title: this.fb.control(null, Validators.required),
      alt_name: this.fb.control(null, Validators.required),
      is_primary: this.fb.control(true),
      comment: this.fb.control(null),
    }); 
  }
  
  public saveForm() {
    const data = this.form.value;
    this.saveFormEvent.emit(data);
  }
}
