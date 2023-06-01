import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTableDataComponent } from './general-table-data.component';

describe('GeneralTableDataComponent', () => {
  let component: GeneralTableDataComponent;
  let fixture: ComponentFixture<GeneralTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralTableDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
