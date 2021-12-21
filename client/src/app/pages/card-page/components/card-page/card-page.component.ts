import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardItemDto } from '@shared/models';
import { CardStateService } from '@shared/services/card/card-state.service';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CardPageService } from '../../services/card-page.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPageComponent implements OnInit {

  public products$: Observable<CardItemDto[]>;
  constructor(
    private readonly cardPageService: CardPageService,
    private readonly cardStateService: CardStateService
    ) { }

  ngOnInit(): void {
    this.products$ = this.cardStateService.getCardStateValue().pipe(
      // filter(productsId => !!productsId?.length),
      switchMap(productsId => {
        return this.cardPageService.getProducts(productsId)
      })
    );
  }

  public deleteFromCard(id: number): void {
    this.cardStateService.deleteFromCard(id)
  }
}
