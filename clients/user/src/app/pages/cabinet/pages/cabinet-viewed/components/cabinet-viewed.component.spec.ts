import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabinetViewedComponent } from './cabinet-viewed.component';


describe('CabinetViewedComponent', () => {
  let component: CabinetViewedComponent;
  let fixture: ComponentFixture<CabinetViewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetViewedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
