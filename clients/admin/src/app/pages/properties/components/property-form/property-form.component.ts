import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertiesGroupDto, PropertiesGroupPayload } from 'src/app/shared/models/properties.model';
import { environment } from 'src/environments/environment.global';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  

  @Output() saveFormEvent = new EventEmitter<PropertiesGroupPayload>();
  @Input() propertiesGroupData: PropertiesGroupDto;
  @Input() propertyGroups: Array<PropertiesGroupDto>;
  
  public languages = environment.langs.split(',');
  public form: FormGroup;

  public propertyGroupsControl = new FormControl(null, Validators.required);

  
  constructor(
    private readonly fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm() {
    this.form = this.fb.group({
      title: this.fb.control(null, Validators.required),
      alt_name: this.fb.control(null, Validators.required),
      propertygroup: this.propertyGroupsControl,
      comment: this.fb.control(null),
    });
  }
  
  public saveForm() {
    const data = this.form.value;
    this.saveFormEvent.emit(data);
  }
  
}
