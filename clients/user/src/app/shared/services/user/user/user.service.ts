import { Injectable } from '@angular/core';
import { UserI } from '@shared/models/user';
import { UserApiService } from '@shared/services/api_es/user-api/user-api.service';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly userApiService: UserApiService) {}

  public userSatate$: Observable<UserI> = this.userApiService.getUser().pipe(shareReplay(1));
  public getUser(): Observable<UserI> {
   return this.userApiService.getUser()
  }
}
