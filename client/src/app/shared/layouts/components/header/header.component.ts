import { Component, OnInit } from '@angular/core';
import { OrderCardItemDto, OrderDto, OrderProductI } from '@shared/models/products/order.model';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
import { LANGUAGES } from '@shared/static/languages';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cardValue$: Observable<string[]>
  public languages = LANGUAGES;
  constructor(private readonly cardStateService: CardStateService) { }

  ngOnInit(): void {
    this.cardValue$ = this.cardStateService.getCardStateValue().pipe(
      map((order: OrderDto) => order?.list.map((product: OrderCardItemDto) => product?.id)
      )
    );
  }

}
