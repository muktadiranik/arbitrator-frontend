import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeV2Component } from './tree-v2.component';

describe('TreeV2Component', () => {
  let component: TreeV2Component;
  let fixture: ComponentFixture<TreeV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeV2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
