import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorNoteLanesComponent } from './arbitrator-note-lanes.component';

describe('ArbitratorNoteLanesComponent', () => {
  let component: ArbitratorNoteLanesComponent;
  let fixture: ComponentFixture<ArbitratorNoteLanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbitratorNoteLanesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbitratorNoteLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
