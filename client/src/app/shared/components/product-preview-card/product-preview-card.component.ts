import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
}
