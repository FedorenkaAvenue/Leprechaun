import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ProductCardI } from '@shared/models/products/products.model';
import { environment } from 'environments/environment.global';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductCardI;
  @Output() toCartEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() toFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();

  public apiUrl = environment.mediaEndpoint;
  constructor() { }

  ngOnInit(): void {
  }

  addToCart(productId: number): void {
    this.toCartEvent.emit(productId);
  }

  addToFavorite(productId: string): void {
    this.toFavoriteEvent.emit(productId);
  }

  deleteFromFavorites(productId: string): void {
    this.deleteFromFavoriteEvent.emit(productId)
  }
}
