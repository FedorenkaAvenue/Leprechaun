import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductDetailsI } from '@shared/models';

@Component({
  selector: 'app-products-selection-list',
  templateUrl: './products-selection-list.component.html',
  styleUrls: ['./products-selection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSelectionListComponent implements OnInit {

  @Input() products: ProductDetailsI[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
