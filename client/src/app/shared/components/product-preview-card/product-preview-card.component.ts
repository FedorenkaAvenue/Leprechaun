import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductsPreviewI } from '@shared/models';

@Component({
  selector: 'app-product-preview-card',
  templateUrl: './product-preview-card.component.html',
  styleUrls: ['./product-preview-card.component.scss']
})
export class ProductPreviewCardComponent implements OnInit {

  @Input() product: ProductsPreviewI;
  @Output() toFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  addToFavorites(productId: string): void {
    this.toFavoriteEvent.emit(productId)
  }

   deleteFromFavorites(productId: string): void {
    this.deleteFromFavoriteEvent.emit(productId)
  }
}
