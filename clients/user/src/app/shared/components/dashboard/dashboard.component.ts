import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductsPreviewI } from '@shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
