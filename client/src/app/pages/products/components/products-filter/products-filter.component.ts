import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
