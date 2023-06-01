import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlenaryTableDataComponent } from './plenary-table-data.component';

describe('PlenaryTableDataComponent', () => {
  let component: PlenaryTableDataComponent;
  let fixture: ComponentFixture<PlenaryTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlenaryTableDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlenaryTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
