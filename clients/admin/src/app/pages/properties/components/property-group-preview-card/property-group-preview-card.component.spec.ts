import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGroupPreviewCardComponent } from './property-group-preview-card.component';

describe('PropertyGroupPreviewCardComponent', () => {
  let component: PropertyGroupPreviewCardComponent;
  let fixture: ComponentFixture<PropertyGroupPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyGroupPreviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyGroupPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
