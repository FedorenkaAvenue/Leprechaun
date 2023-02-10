import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPreviewCardComponent } from './property-preview-card.component';

describe('PropertyPreviewCardComponent', () => {
  let component: PropertyPreviewCardComponent;
  let fixture: ComponentFixture<PropertyPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyPreviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
