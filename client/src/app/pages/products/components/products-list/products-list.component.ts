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
  @Output() toCardEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() toFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
      
  }
  public addToCard(productId: string): void {
    this.toCardEvent.emit(productId);
  }

  public addToFavorite(productId: string): void {
    this.toFavoriteEvent.emit(productId);
  }

  public deleteFromFavorite(productId: string): void {
    this.deleteFromFavoriteEvent.emit(productId)
  }
}
