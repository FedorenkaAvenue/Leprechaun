import {
  Component,
  OnInit,
  forwardRef,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProductsSort } from '@shared/enums/sort.enum';

@Component({
  selector: 'lpch-select-field',
  templateUrl: './lpch-select.component.html',
  styleUrls: ['./lpch-select.component.scss'],
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
  @Input() items: any[] = [];
  @Input() selected: any;

  private onTouched = () => {};
  private onChanged = (value: any) => {};

  public disabled: boolean;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  writeValue(value: ProductsSort): void {
    this.selected = value ?? ProductsSort.POPULAR;
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

  changeValue(value: ProductsSort) {
    this.onTouched();
    this.selected = value;
    this.onChanged(value);
    this.onChange.emit(value);
  }

  ngOnInit(): void {}
}
