import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-slider-field',
  templateUrl: './slider-field.component.html',
  styleUrls: ['./slider-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderFieldComponent),
      multi: true,
    },
  ],
})
export class SliderFieldComponent implements ControlValueAccessor {
  public value = 0;
  constructor(
  ) {}

  onChange(_: any) {}

  changeValue(value: MatSliderChange) {
    this.value = value?.value || 0;
    // if (value?.value ?? '0') {
    //   return;
    // }
    // this.value = value?.value;
    console.log(this.value);
    
    this.onChange(this.value)
  }
  
changeFielddValue(value: number) {
  // this.value = value;
  console.log(this.value);
  
  this.onChange(value)
}

  writeValue(value: any) {
    this.value = value;
  }

  sdasdasd() {
    
    
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched() {}
}


