import { Component, OnInit } from '@angular/core';
import { CardStateService } from '@shared/services/card/card-state.service';
import { FavoriteService } from '@shared/services/favorite/favorite.service';
import { LANGUAGES } from '@shared/static/languages';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cardValue$: Observable<Array<number>>
  public favoriteValue$: Observable<Array<number>>
  public languages = LANGUAGES;
  constructor(
    private readonly cardService: CardStateService,
    private readonly favoriteService: FavoriteService,
    ) { }

  ngOnInit(): void {
    this.cardValue$ = this.cardService.getCardStateValue();
    this.favoriteValue$ = this.favoriteService.getFavoriteStateValue();
  }

}
