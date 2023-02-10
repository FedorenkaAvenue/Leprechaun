import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/search/autocomplete`;
  constructor(
    private readonly http: HttpClient,
  ) { }

  public getAutocompleteResult(substring: string): Observable<any> {
   return this.http.get(`${this.apiUrl}`, {params: {substring}})
  }
}
