import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderDto } from '@shared/models/products/order.model';
import { CardService } from '@shared/services/card/card/card.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPageComponent implements OnInit {
  public cardData$: Observable<OrderDto>;
  constructor(
    private readonly cardService: CardService,
  ) {
  }

  ngOnInit(): void {
    this.cardData$ = this.cardService.getCardValue();
  }

  

  public deleteFromCard(id: string): void {
    this.cardService
      .deleteProduct(id)
      .pipe(take(1))
      .subscribe((order: OrderDto) => {
        this.cardService.updateCard(order);
      });
  }
}
