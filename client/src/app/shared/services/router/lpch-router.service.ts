import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LpchRouterService {

  constructor(private readonly router: Router) { }

  public navigateToCart() {
    this.router.navigate(['/cart'])
  }
}
