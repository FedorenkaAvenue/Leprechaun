import { TestBed } from '@angular/core/testing';

import { ProperiesService } from './properies.service';

describe('ProperiesService', () => {
  let service: ProperiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProperiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
