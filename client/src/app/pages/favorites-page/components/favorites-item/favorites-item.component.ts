import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.scss']
})
export class FavoritesItemComponent implements OnInit {

  @Input() product: any;
  @Output() delete = new EventEmitter<string>();
  @Output() addToCard = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public deleteFromFavorites(id: string): void {
    this.delete.emit(id)
  }

  public addProductToCard(id: string): void {
    this.addToCard.emit(id)
  }
}
