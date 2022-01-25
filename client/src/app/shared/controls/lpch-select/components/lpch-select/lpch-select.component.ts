import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class LpchSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchable: boolean = false;
  @Input() clearable: boolean = false;
  @Input() items: any[] = [];
  @Input() data: any;

  private onTouched = () => {};
  private onChanged = (value: any) => {};

  public disabled: boolean;
  public selected: any;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
      const data = changes.data;
      if(data && data.currentValue) {
        console.log(data?.currentValue);
        this.selected= data?.currentValue
        // this.writeValue(data?.currentValue)
        console.log(this.selected);
        
      }
      if(changes.items?.currentValue) {
        console.log(changes.items?.currentValue);
        this.cdr.detectChanges();
        
      }
  }
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
    this.selected = value?.id;
    this.onChanged(value?.id);
    this.onChange.emit(value?.id);
  }

  ngOnInit(): void {}
}
