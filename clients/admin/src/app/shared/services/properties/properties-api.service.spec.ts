import { TestBed } from '@angular/core/testing';

import { PropertiesApiService } from './properties-api.service';

describe('PropertiesApiService', () => {
  let service: PropertiesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertiesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
