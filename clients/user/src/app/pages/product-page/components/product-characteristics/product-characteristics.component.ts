import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCharacteristicsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
