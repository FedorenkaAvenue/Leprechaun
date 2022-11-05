import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from '@shared/models/user/user.model';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
    
  private readonly apiUrl = `${environment?.apiEndpoint}/user`;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getUser(): Observable<UserI>{
    return this.http.get<UserI>(`${this.apiUrl}`);
  }
}