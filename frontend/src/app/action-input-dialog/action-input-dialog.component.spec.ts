import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInputDialogComponent } from './action-input-dialog.component';

describe('ActionInputDialogComponent', () => {
  let component: ActionInputDialogComponent;
  let fixture: ComponentFixture<ActionInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionInputDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
