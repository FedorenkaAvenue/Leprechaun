import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpchPhoneComponent } from './lpch-phone.component';

describe('LpchPhoneComponent', () => {
  let component: LpchPhoneComponent;
  let fixture: ComponentFixture<LpchPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpchPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpchPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
