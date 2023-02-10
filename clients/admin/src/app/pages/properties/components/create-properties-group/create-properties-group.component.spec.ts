import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertiesGroupComponent } from './create-properties-group.component';

describe('CreatePropertiesGroupComponent', () => {
  let component: CreatePropertiesGroupComponent;
  let fixture: ComponentFixture<CreatePropertiesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropertiesGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropertiesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
