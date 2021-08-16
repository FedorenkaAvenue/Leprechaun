import { Component, Input, OnInit } from '@angular/core';
import { ProductCardDto } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Input() products: ProductCardDto[];
  constructor() { }

  ngOnInit(): void {
  }

}
