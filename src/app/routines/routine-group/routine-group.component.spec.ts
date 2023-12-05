import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineGroupComponent } from './routine-group.component';

describe('RoutineGroupComponent', () => {
  let component: RoutineGroupComponent;
  let fixture: ComponentFixture<RoutineGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutineGroupComponent]
    });
    fixture = TestBed.createComponent(RoutineGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
