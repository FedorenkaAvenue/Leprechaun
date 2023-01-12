import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesGroupFormComponent } from './properties-group-form.component';

describe('PropertiesGroupFormComponent', () => {
  let component: PropertiesGroupFormComponent;
  let fixture: ComponentFixture<PropertiesGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
