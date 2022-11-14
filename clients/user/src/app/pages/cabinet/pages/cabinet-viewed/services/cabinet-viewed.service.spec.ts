import { TestBed } from '@angular/core/testing';

import { CabinetViewedService } from './cabinet-viewed.service';

describe('CabinetViewedService', () => {
  let service: CabinetViewedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabinetViewedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
