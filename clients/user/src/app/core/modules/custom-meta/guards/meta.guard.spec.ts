import { TestBed, async, inject } from '@angular/core/testing';

import { MetaGuard } from './meta.guard';

describe('MetaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetaGuard]
    });
  });

  it('should ...', inject([MetaGuard], (guard: MetaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
