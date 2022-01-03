import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FavoritesStateService {
  
  private favoritesState$: BehaviorSubject<any>;

 
  constructor() {
    this.favoritesState$ = new BehaviorSubject<any>(null);
  }


  public updateFavorites(order: any): void {
    this.favoritesState$.next(order);
  }

  public getFavoritesStateValue(): Observable<any> {
    return this.favoritesState$.asObservable();
  }
}
