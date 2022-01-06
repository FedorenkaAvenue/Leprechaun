import { TestBed } from '@angular/core/testing';

import { LpchRouterService } from './lpch-router.service';

describe('LpchRouterService', () => {
  let service: LpchRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LpchRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
