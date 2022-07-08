import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductLabelI } from '@shared/models/products/product-label.model';

@Component({
  selector: 'app-product-label',
  templateUrl: './product-label.component.html',
  styleUrls: ['./product-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductLabelComponent implements OnInit {
  @Input() labelData: ProductLabelI;
  
  constructor() { }

  ngOnInit(): void {
  }


}
