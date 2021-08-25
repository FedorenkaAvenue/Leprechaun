import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductCardDto } from '@shared/models/products/products.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductCardDto;

  constructor() { }

  ngOnInit(): void {
  }

}
