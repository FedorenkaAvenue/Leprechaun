import { TestBed } from '@angular/core/testing';

import { CabinetOrdersService } from './cabinet-orders.service';

describe('CabinetOrdersService', () => {
  let service: CabinetOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabinetOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
