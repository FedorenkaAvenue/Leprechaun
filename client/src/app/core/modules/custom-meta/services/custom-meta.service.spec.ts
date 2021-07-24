import { TestBed } from '@angular/core/testing';

import { CustomMetaService } from './custom-meta.service';

describe('CustomMetaService', () => {
  let service: CustomMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
