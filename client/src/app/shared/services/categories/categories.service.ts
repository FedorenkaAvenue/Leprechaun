import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';

@Injectable()

export class CategoriesService {

  private readonly apiUrl = 'someApiUrl'

  
  constructor(
    private readonly http: TransferHttpService
  ) { }

  public getCategoryShortList() {
    return this.http.get(`$`)
  }
}
