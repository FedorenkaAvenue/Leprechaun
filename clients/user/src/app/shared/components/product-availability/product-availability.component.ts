import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lpch-product-availability',
  templateUrl: './product-availability.component.html',
  styleUrls: ['./product-availability.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAvailabilityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
