import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingExpandableComponent } from './thing-expandable.component';

describe('ThingExpandableComponent', () => {
  let component: ThingExpandableComponent;
  let fixture: ComponentFixture<ThingExpandableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThingExpandableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThingExpandableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
