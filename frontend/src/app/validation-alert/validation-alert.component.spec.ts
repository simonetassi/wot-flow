import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAlertComponent } from './validation-alert.component';

describe('ValidationAlertComponent', () => {
  let component: ValidationAlertComponent;
  let fixture: ComponentFixture<ValidationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
