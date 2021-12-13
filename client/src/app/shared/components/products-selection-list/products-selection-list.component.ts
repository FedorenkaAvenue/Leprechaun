import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductCardDto, ProductsPreviewI } from '@shared/models';

@Component({
  selector: 'app-products-selection-list',
  templateUrl: './products-selection-list.component.html',
  styleUrls: ['./products-selection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSelectionListComponent implements OnInit {

  @Input() products: ProductsPreviewI[];
  @Input() title: ProductsPreviewI[];
  
  
  constructor() { }

  ngOnInit(): void {
  }
}
