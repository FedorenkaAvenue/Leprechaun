import { Injectable } from '@angular/core';
import { UserI } from '@shared/models/user/user.model';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserApiService } from '../api_es/user-api/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly userApiService: UserApiService) {}
  public userSatate$: Observable<UserI>
  public getUser(): void {
   this.userSatate$  = this.userApiService.getUser().pipe(shareReplay(1));
  //  return this.userApiService.getUser()
  }
}