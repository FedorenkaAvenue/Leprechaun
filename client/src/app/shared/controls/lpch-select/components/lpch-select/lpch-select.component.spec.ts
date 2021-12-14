import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpchSelectComponent } from './lpch-select.component';

describe('LpchSelectComponent', () => {
  let component: LpchSelectComponent;
  let fixture: ComponentFixture<LpchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpchSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
