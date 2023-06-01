import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLogCardComponent } from './time-log-card.component';

describe('TimeLogCardComponent', () => {
  let component: TimeLogCardComponent;
  let fixture: ComponentFixture<TimeLogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeLogCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeLogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
