import { TestBed } from '@angular/core/testing';

import { ProductsManagerService } from './products-manager.service';

describe('ProductsManagerService', () => {
  let service: ProductsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
