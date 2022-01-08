import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ProductCardDto } from '@shared/models/products/products.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductCardDto;
  @Output() toCardEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() toFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addToCard(productId: number): void {
    this.toCardEvent.emit(productId);
  }

  addToFavorite(productId: string): void {
    this.toFavoriteEvent.emit(productId);
  }

  deleteFromFavorites(productId: string): void {
    this.deleteFromFavoriteEvent.emit(productId)
  }
}
