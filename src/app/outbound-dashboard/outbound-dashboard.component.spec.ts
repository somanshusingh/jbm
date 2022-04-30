import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundDashboardComponent } from './outbound-dashboard.component';

describe('OutboundDashboardComponent', () => {
  let component: OutboundDashboardComponent;
  let fixture: ComponentFixture<OutboundDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
