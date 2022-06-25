import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPersonalPageComponent } from './category-personal-page.component';

describe('CategoryPersonalPageComponent', () => {
  let component: CategoryPersonalPageComponent;
  let fixture: ComponentFixture<CategoryPersonalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPersonalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
