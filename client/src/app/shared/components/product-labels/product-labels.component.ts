import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductLabelI } from '@shared/models/products/product-label.model';

@Component({
  selector: 'app-product-labels',
  templateUrl: './product-labels.component.html',
  styleUrls: ['./product-labels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductLabelsComponent implements OnInit {
  @Input() labelsData: Array<ProductLabelI>;
  
  constructor() { }

  ngOnInit(): void {
  }


}
