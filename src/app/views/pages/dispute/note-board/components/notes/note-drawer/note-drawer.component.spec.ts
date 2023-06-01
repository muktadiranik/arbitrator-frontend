import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDrawerComponent } from './note-drawer.component';

describe('NoteDrawerComponent', () => {
  let component: NoteDrawerComponent;
  let fixture: ComponentFixture<NoteDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
