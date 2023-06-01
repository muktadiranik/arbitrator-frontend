import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryChecklistComponent } from './library-checklist.component';

describe('LibraryChecklistComponent', () => {
  let component: LibraryChecklistComponent;
  let fixture: ComponentFixture<LibraryChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryChecklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
