import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorNotesInputComponent } from './arbitrator-notes-input.component';

describe('ArbitratorNotesInputComponent', () => {
  let component: ArbitratorNotesInputComponent;
  let fixture: ComponentFixture<ArbitratorNotesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitratorNotesInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbitratorNotesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
