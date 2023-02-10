import { TestBed } from '@angular/core/testing';

import { AutocompleteApiService } from './autocomplete-api.service';

describe('AutocompleteApiService', () => {
  let service: AutocompleteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompleteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
