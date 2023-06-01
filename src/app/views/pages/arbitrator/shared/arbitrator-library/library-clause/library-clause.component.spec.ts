import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryClauseComponent } from './library-clause.component';

describe('LibraryClauseComponent', () => {
  let component: LibraryClauseComponent;
  let fixture: ComponentFixture<LibraryClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryClauseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
