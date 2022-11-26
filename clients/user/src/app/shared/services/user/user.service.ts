import { Injectable } from '@angular/core';
import { UserI } from '@shared/models/user/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserApiService } from '../api_es/user-api/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly userApiService: UserApiService) {}
  public userSatate$ = new BehaviorSubject(null);
  // public user$



  public getUser(): Observable<UserI> {
   return this.userApiService.getUser().pipe(shareReplay(1));
  }

  updateUser(user: UserI): void {
    this.userSatate$.next(user)
  }
}