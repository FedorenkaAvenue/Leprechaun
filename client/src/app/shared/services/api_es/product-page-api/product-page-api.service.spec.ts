import { TestBed } from '@angular/core/testing';

import { ProductPageApiService } from './product-page-api.service';

describe('ProductPageApiService', () => {
  let service: ProductPageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
