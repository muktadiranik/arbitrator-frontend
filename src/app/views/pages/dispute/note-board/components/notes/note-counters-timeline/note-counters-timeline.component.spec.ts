import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCountersTimelineComponent } from './note-counters-timeline.component';

describe('NoteCountersTimelineComponent', () => {
  let component: NoteCountersTimelineComponent;
  let fixture: ComponentFixture<NoteCountersTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteCountersTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteCountersTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
