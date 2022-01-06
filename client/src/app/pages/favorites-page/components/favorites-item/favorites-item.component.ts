import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
// import { CardItemDto } from '@shared/models';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesItemComponent implements OnInit, OnChanges {

  @Input() product: any;
  @Output() delete = new EventEmitter<string>();
  @Output() addToCard = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.product && changes?.product?.currentValue)  {
      console.log(this.product);
    }
  }

  public deleteFromCard(id: number): void {
    this.delete.emit(id)
  }

  public addProductToCard(id: string): void {

  }
}
