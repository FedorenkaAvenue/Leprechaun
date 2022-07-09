import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLabelComponent } from './product-label.component';

describe('ProductLabelComponent', () => {
  let component: ProductLabelComponent;
  let fixture: ComponentFixture<ProductLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
