import { Injectable } from '@angular/core';
import { UserApiService } from '@shared/services/api_es/user-api/user-api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly userApiService: UserApiService) {}

  public getUser(): Observable<any> {
    console.log(34234);
    
   return this.userApiService.getUser()
  }
}
