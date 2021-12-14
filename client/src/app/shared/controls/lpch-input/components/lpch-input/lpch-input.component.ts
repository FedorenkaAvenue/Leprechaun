import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'lpch-input-field',
  templateUrl: './lpch-input.component.html',
  styleUrls: ['./lpch-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LpchInputComponent implements OnInit {
  @Input() type: string = 'text';
  constructor() { }

  ngOnInit(): void {
  }

}
