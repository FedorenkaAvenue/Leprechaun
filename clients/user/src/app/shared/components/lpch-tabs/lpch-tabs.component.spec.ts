import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpchTabsComponent } from './lpch-tabs.component';

describe('LpchTabsComponent', () => {
  let component: LpchTabsComponent;
  let fixture: ComponentFixture<LpchTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpchTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LpchTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
