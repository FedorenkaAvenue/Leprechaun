import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lpch-counter-input',
  templateUrl: './lpch-counter-input.component.html',
  styleUrls: ['./lpch-counter-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LpchCounterInputComponent),
      multi: true,
    },
  ],
})
export class LpchCounterInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Output() changeCount = new EventEmitter<number>();
  @Input() set value(value: number) {
    this.control.patchValue(value);
  }

  public control = new FormControl(1);
  public subscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.control.valueChanges.pipe(debounceTime(800)).subscribe((res) => {
      this.updateValue(res);
    });
  }

  private onChange = (value: any) => {};
  private onTouched = () => {};

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public writeValue(outsideValue: number) {
    this.control.patchValue(outsideValue);
  }

  public updateValue(insideValue: number) {
    const control = this.control;
    control.patchValue(insideValue);
    this.onChange(insideValue);
    this.onTouched();
    this.changeCount.emit(control?.value);
  }

  public subtract(): void {
    const control = this.control; 
    let value = control.value;
    control.patchValue(--value);
  }

  public add(): void {
    const control = this.control; 
    let value = control.value;
    control.patchValue(++value);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
