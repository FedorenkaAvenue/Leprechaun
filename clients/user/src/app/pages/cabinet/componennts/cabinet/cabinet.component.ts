import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
