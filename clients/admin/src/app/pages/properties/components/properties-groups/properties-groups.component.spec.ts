import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesGroupsComponent } from './properties-groups.component';

describe('PropertiesGroupsComponent', () => {
  let component: PropertiesGroupsComponent;
  let fixture: ComponentFixture<PropertiesGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
