import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpchImagesSliderComponent } from './lpch-images-slider.component';

describe('LpchImagesSliderComponent', () => {
  let component: LpchImagesSliderComponent;
  let fixture: ComponentFixture<LpchImagesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpchImagesSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LpchImagesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
