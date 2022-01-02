import { Component, OnInit } from '@angular/core';
import { FavoriteStateService } from '@shared/services/favorite/favorite.service';
import { OrderCardItemDto, OrderDto } from '@shared/models/products/order.model';
import { LANGUAGES } from '@shared/static/languages';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cardValue$: Observable<string[]>
  public favoriteValue$: Observable<Array<string>>
  public languages = LANGUAGES;
  constructor(
    private readonly cardStateService: CardStateService,
    private readonly favoriteStateService: FavoriteStateService) { }

  ngOnInit(): void {
    this.cardValue$ = this.cardStateService.getCardStateValue().pipe(
      map((order: OrderDto) => order?.list.map((product: OrderCardItemDto) => product?.id)
      )
    );
    this.favoriteValue$ = this.favoriteStateService.getFavoriteStateValue();
  }

}
