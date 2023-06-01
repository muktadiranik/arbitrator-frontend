import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfolderModalComponent } from './newfolder-modal.component';

describe('NewfolderModalComponent', () => {
  let component: NewfolderModalComponent;
  let fixture: ComponentFixture<NewfolderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewfolderModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewfolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
