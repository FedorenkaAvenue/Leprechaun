import { TestBed } from '@angular/core/testing';

import { CardPageService } from './card-page.service';

describe('CardPageService', () => {
  let service: CardPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
