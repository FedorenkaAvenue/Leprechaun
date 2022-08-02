
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCardDto } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductCardDto;
  @Output() onRemoveProduct = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  public removeProduct(id?: number): void {
    this.onRemoveProduct.next(id);
  }

  public goToProdView(): void {
    
  }
 
}
