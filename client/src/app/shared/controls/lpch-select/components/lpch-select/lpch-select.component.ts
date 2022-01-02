import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lpch-select-field',
  templateUrl: './lpch-select.component.html',
  styleUrls: ['./lpch-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LpchSelectComponent),
      multi: true,
    },
  ],
})
export class LpchSelectComponent implements OnInit, ControlValueAccessor {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchable: boolean = false;
  @Input() clearable: boolean = false;
  private onTouched = () => {};
  private onChanged = (value: any) => {};

  public disabled: boolean;
  public selected: any;
  public items = [
    {
      id: 1,
      name: 'Audi',
    },
    {
      id: 2,
      name: 'BMW',
    },
  ];
  constructor() {}

  writeValue(value: string): void {
    this.selected = value ?? 'IN';
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn; // <-- save the function
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn; // <-- save the function
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  changeValue(value: any) {
    this.onTouched();
    this.selected = value;
    this.onChanged(value);
    this.onChange.emit(value);
  }

  ngOnInit(): void {}
}
