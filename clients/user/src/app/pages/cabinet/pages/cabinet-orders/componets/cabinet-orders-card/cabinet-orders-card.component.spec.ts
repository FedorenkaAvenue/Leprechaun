import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetOrdersCardComponent } from './cabinet-orders-card.component';

describe('CabinetOrdersCardComponent', () => {
  let component: CabinetOrdersCardComponent;
  let fixture: ComponentFixture<CabinetOrdersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetOrdersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetOrdersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
