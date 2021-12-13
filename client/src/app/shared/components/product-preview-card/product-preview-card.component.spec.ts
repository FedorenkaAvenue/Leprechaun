import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPreviewCardComponent } from './product-preview-card.component';

describe('ProductPreviewCardComponent', () => {
  let component: ProductPreviewCardComponent;
  let fixture: ComponentFixture<ProductPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPreviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
