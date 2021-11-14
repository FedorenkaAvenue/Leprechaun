import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SelectionProductType } from '@shared/enums';
import { ProductDetailsI } from '@shared/models';

import { Observable } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public popularProducts: Observable<ProductDetailsI[]>;
  public newProducts: Observable<ProductDetailsI[]>;

  constructor(
    private readonly homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.popularProducts = this.getPopularProducts();
    this.newProducts = this.getNewProducts();
  }

  private getPopularProducts(): Observable<ProductDetailsI[]> {
    return this.homeService.getSelectionProducts(SelectionProductType.POPULAR, 1);
  }

  private getNewProducts(): Observable<ProductDetailsI[]> {
    return this.homeService.getSelectionProducts(SelectionProductType.NEW, 1);
  }
}
