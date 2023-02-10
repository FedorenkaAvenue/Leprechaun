import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteApiService } from '../api_es/autocomplete-api/autocomplete-api.service';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private readonly autocompleteApiService: AutocompleteApiService) { }

  public getAutocompleteResult(substring: string): Observable<any> {
    return this.autocompleteApiService.getAutocompleteResult(substring)
  }
}
