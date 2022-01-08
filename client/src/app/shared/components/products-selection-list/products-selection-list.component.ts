import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductsPreviewI } from '@shared/models';

@Component({
  selector: 'app-products-selection-list',
  templateUrl: './products-selection-list.component.html',
  styleUrls: ['./products-selection-list.component.scss']
})
export class ProductsSelectionListComponent implements OnInit {

  @Input() products: ProductsPreviewI[];
  @Input() title: string;
  @Output() toFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromFavoriteEvent: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public addToFavorite(productId: string): void {
    this.toFavoriteEvent.emit(productId);
  }
  public deleteFromFavorite(productId: string): void {
    this.deleteFromFavoriteEvent.emit(productId)
  }

}
