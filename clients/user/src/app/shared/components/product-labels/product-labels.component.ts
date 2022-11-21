import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { ProductLabelI } from '@shared/models/products/product-label.model';

@Component({
  selector: 'app-product-labels',
  templateUrl: './product-labels.component.html',
  styleUrls: ['./product-labels.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductLabelsComponent implements OnInit {
  @Input() labelsData: Array<ProductLabelI>;
  @HostBinding('class') class = ['labels', 'fl-c', 'g-1'];
  
  constructor() { }

  ngOnInit(): void {}
}
