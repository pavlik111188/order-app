import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRestaurantComponent } from './dashboard-restaurant.component';

describe('DashboardRestaurantComponent', () => {
  let component: DashboardRestaurantComponent;
  let fixture: ComponentFixture<DashboardRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
