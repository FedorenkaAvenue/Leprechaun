import { Component, OnInit, ChangeDetectionStrategy, Input, InjectionToken, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

// const NG_VALUE_ACCESSOR: InjectionToken<ControlValueAccessor>;

@Component({
  selector: 'lpch-phone-field',
  templateUrl: './lpch-phone.component.html',
  styleUrls: ['./lpch-phone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LpchPhoneComponent),
      multi: true
    }
  ]
})
export class LpchPhoneComponent implements OnInit, ControlValueAccessor  {

  @Input() type: string = 'tel';
  @Input() placeholder: string = 'Enter your data...';
  @Input() maxLength: string;
  public userForm: FormGroup;
  public value: string;
  public disabled = false;
  constructor() {}

  ngOnInit(): void {
  }

  private onChange = (value: any) => {};
  private onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(insideValue: string) {
    this.value = insideValue;
    this.onChange(insideValue);
    this.onTouched();
  }

}
