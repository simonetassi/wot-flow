import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineNameDialogComponent } from './routine-name-dialog.component';

describe('RoutineNameDialogComponent', () => {
  let component: RoutineNameDialogComponent;
  let fixture: ComponentFixture<RoutineNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineNameDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
