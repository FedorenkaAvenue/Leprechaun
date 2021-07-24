import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeprachaunIconsComponent } from './leprachaun-icons.component';

describe('LeprachaunIconsComponent', () => {
  let component: LeprachaunIconsComponent;
  let fixture: ComponentFixture<LeprachaunIconsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeprachaunIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeprachaunIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
