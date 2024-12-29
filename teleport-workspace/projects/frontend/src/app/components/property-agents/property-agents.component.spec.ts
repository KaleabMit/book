import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAgentsComponent } from './property-agents.component';

describe('PropertyAgentsComponent', () => {
  let component: PropertyAgentsComponent;
  let fixture: ComponentFixture<PropertyAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
