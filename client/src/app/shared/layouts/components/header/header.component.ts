import { Component, OnInit } from '@angular/core';
import { CardStateService } from '@shared/services/card/card-state.service';
import { LANGUAGES } from '@shared/static/languages';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cardValue$: Observable<Array<number>>
  public languages = LANGUAGES;
  constructor(private readonly cardService: CardStateService) { }

  ngOnInit(): void {
    this.cardValue$ = this.cardService.getCardStateValue();
  }

}
