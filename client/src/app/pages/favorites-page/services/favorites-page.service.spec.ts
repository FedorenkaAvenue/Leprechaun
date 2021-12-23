import { TestBed } from '@angular/core/testing';

import { FavoritesPageService } from './favorites-page.service';

describe('FavoritesPageService', () => {
  let service: FavoritesPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
