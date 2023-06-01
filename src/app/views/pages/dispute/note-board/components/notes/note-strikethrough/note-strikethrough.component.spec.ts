import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteStrikethroughComponent } from './note-strikethrough.component';

describe('NoteStrikethroughComponent', () => {
  let component: NoteStrikethroughComponent;
  let fixture: ComponentFixture<NoteStrikethroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteStrikethroughComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteStrikethroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
