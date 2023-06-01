import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditTimelogComponent } from './view-edit-timelog.component';

describe('ViewEditTimelogComponent', () => {
  let component: ViewEditTimelogComponent;
  let fixture: ComponentFixture<ViewEditTimelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEditTimelogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEditTimelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
