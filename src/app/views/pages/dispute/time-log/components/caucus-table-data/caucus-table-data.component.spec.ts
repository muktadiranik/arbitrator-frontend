import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaucusTableDataComponent } from './caucus-table-data.component';

describe('CaucusTableDataComponent', () => {
  let component: CaucusTableDataComponent;
  let fixture: ComponentFixture<CaucusTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaucusTableDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaucusTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
