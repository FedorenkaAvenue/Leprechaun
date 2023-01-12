import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: TranslationForm
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TranslationForm
    },
  ]
})
export class TranslationForm implements ControlValueAccessor, OnChanges, Validator  {

  public quantity: null | any = null;

  @Input() langs: string[]; 
  @Input() title: string; 
  public form: FormGroup
  constructor(
    private readonly fb:FormBuilder,
    private readonly cd: ChangeDetectorRef
  ) { }

  onChangeSubs: Subscription[] = [];


  writeValue(quantity: any) {
    this.quantity = quantity;
    this.form.patchValue(this.quantity)
  }

  registerOnChange(onChange: any) {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  onChange = (value: any) => {
  };

  onTouched = () => {};

  touched = false;

  disabled = false;
   
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.langs?.currentValue && !this.form) {
      this.createForm()
    }
  }

  private createForm(data = null): void {
    this.form  = this.fb.group({});
    this.langs.forEach(lang => {
      this.form.addControl(lang, this.fb.control(this.quantity, Validators.required))
    })
  }


  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  onValidatorChange = () => {
  };

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
   }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.form.invalid ? { internal: true } : null;
  }

  // validate(control: AbstractControl) {

  //   if (this.form.valid) {
  //     return null;
  //   }

  //   let errors : any = {};

  //   // errors = this.addControlErrors(errors, "addressLine1");
  //   // errors = this.addControlErrors(errors, "addressLine2");
  //   // errors = this.addControlErrors(errors, "zipCode");
  //   // errors = this.addControlErrors(errors, "city");

  //   return errors;
  // }
}
