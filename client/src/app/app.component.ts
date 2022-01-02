import { Component, OnInit } from '@angular/core';

import { MetaService } from '@ngx-meta/core';
import { OrderDto } from '@shared/models/products/order.model';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
import { CardService } from '@shared/services/card/card/card.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly meta: MetaService,
    private readonly cardService: CardService,

    ) {
    this.meta.setTag('og:title', 'home ctor');
  }

  ngOnInit(): void {
    this.getCardState();
  }

  private getCardState(): void {
    this.cardService.getProducts().pipe(
      take(1)
    ).subscribe((order: OrderDto) => {
      this.cardService.updateCard(order);
    })
  }
}
