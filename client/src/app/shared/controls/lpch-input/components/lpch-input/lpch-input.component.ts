import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'lpch-input-field',
  templateUrl: './lpch-input.component.html',
  styleUrls: ['./lpch-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LpchInputComponent),
      multi: true
    }
  ]
})
export class LpchInputComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Enter your data...';
  @Input() maxLength: string;
  public userForm: FormGroup;
  public value: string;
  public disabled = false;
  constructor() { }

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
