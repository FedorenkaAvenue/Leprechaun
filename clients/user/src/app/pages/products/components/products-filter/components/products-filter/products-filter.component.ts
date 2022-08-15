import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FILTERS } from 'app/mock/filters';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFilterComponent implements OnInit {

  public fllters = FILTERS[0]
  constructor() { }

  ngOnInit(): void {
  }

  
}
