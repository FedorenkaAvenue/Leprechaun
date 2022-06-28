import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemsListComponent } from './card-items-list.component';

describe('CardItemsListComponent', () => {
  let component: CardItemsListComponent;
  let fixture: ComponentFixture<CardItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
