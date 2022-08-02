import { Directive, HostBinding, Input } from '@angular/core';

export enum StubImages {
  PRODUCT = 'assets/images/products/default-product.jpg',
  USER = ''
}
@Directive({
  selector: '[stubImage]',
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'src'
   }
})

export class DefaultImageDirective {

  constructor() {}

  @Input() src:string;
  @Input() default = StubImages.PRODUCT;
  @HostBinding('class') className: string

  updateUrl() {
    this.src = this.default;
  }

  load(){
    this.className = 'image-loaded';
  }

}
