import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ProductCardDto, Products } from '@shared/models/products/products.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit, OnChanges {

  @Input() products: Products;
  @Output() toCardEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() toFavoriteEvent: EventEmitter<number> = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
      
  }
  public addToCard(productId): void {
    this.toCardEvent.emit(productId);
  }

  public addToFavorite(productId): void {
    this.toFavoriteEvent.emit(productId);
  }
}
