import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpchInputComponent } from './lpch-input.component';

describe('LpchInputComponent', () => {
  let component: LpchInputComponent;
  let fixture: ComponentFixture<LpchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
