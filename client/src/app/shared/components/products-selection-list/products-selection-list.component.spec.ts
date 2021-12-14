import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSelectionListComponent } from './products-selection-list.component';

describe('ProductsSelectionListComponent', () => {
  let component: ProductsSelectionListComponent;
  let fixture: ComponentFixture<ProductsSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSelectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
