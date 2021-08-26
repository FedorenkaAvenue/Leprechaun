import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductCardDto, Products } from '@shared/models/products/products.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {

  @Input() products: Products;
  
  constructor() { }

  ngOnInit(): void {
  }

}
