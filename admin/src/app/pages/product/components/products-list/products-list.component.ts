import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCardDto } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @Input() products: ProductCardDto[];
  @Output() onRemoveProduct = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  public removeProduct(id: number): void {
    this.onRemoveProduct.next(id);
  }
  
}
