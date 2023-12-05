import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineRecipeComponent } from './routine-recipe.component';

describe('RoutineComponent', () => {
  let component: RoutineRecipeComponent;
  let fixture: ComponentFixture<RoutineRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutineRecipeComponent]
    });
    fixture = TestBed.createComponent(RoutineRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
