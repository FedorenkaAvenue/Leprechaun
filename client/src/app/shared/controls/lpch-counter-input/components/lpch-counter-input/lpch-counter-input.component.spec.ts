import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpchCounterInputComponent } from './lpch-counter-input.component';

describe('LpchCounterInputComponent', () => {
  let component: LpchCounterInputComponent;
  let fixture: ComponentFixture<LpchCounterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpchCounterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpchCounterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
