import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CardItemDto } from '@shared/models';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent implements OnInit {

  @Input() product: CardItemDto;
  @Output() delete = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }
  
  public deleteFromCard(id: number): void {
    this.delete.emit(id)
  }
}
