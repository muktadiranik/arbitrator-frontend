import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDocumentComponent } from './library-document.component';

describe('LibraryDocumentComponent', () => {
  let component: LibraryDocumentComponent;
  let fixture: ComponentFixture<LibraryDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryDocumentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
