import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpchImageComponent } from './lpch-image.component';

describe('LpchImageComponent', () => {
  let component: LpchImageComponent;
  let fixture: ComponentFixture<LpchImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpchImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpchImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
