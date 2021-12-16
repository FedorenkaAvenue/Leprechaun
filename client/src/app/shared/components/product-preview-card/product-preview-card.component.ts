import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-preview-card',
  templateUrl: './product-preview-card.component.html',
  styleUrls: ['./product-preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewCardComponent implements OnInit {

  @Input() product: any;
  @Output() toCardEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addToCard(productId: number): void {
    this.toCardEvent.emit(productId)
  }


}
