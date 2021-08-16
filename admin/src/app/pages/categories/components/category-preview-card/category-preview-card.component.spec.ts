import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPreviewCardComponent } from './category-preview-card.component';

describe('CategoryPreviewCardComponent', () => {
  let component: CategoryPreviewCardComponent;
  let fixture: ComponentFixture<CategoryPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPreviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
