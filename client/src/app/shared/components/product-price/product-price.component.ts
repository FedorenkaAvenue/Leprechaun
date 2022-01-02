import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PriceI } from '@shared/models/products/product-price.model';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPriceComponent implements OnInit {
  @Input() price: PriceI;
  
  constructor() { }

  ngOnInit(): void {
  }

}
