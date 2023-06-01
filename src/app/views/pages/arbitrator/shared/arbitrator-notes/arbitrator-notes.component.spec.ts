import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorNotesComponent } from './arbitrator-notes.component';

describe('ArbitratorNotesComponent', () => {
  let component: ArbitratorNotesComponent;
  let fixture: ComponentFixture<ArbitratorNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitratorNotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbitratorNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
