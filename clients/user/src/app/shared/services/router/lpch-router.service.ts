import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Injectable({
  providedIn: 'root'
})
export class LpchRouterService {

  constructor(
    private readonly router: Router,
    private localize: LocalizeRouterService
    ) { }

  public navigateToCart():void {
    let cartPath: any = this.localize.translateRoute('/cart');
    this.router.navigate([cartPath])
  }

  public navigateToOrderHistory():void {
    let orderHistoryPath: any = this.localize.translateRoute('/cabinet/orders');
    this.router.navigate([orderHistoryPath])
  }
}
