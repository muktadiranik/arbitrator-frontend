import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBlurComponent } from './note-blur.component';

describe('NoteBlurComponent', () => {
  let component: NoteBlurComponent;
  let fixture: ComponentFixture<NoteBlurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteBlurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteBlurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
