import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
    
  private readonly apiUrl = `${environment?.apiEndpoint}/user`;

  constructor(
    private readonly http: TransferHttpService
  ) { }

  public getUser(): Observable<any>{
    console.log(3423);
    
    return this.http.get(`${this.apiUrl}`);
  }
}
