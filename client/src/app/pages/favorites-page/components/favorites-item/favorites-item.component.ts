import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
// import { CardItemDto } from '@shared/models';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesItemComponent implements OnInit {

  @Input() product: any;
  @Output() delete = new EventEmitter<number>()
  
  constructor() { }

  ngOnInit(): void {
  }

  public deleteFromCard(id: number): void {
    this.delete.emit(id)
  }
}
