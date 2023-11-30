import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsComponent } from './recipes.component';

describe('MealsComponent', () => {
  let component: MealsComponent;
  let fixture: ComponentFixture<MealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealsComponent]
    });
    fixture = TestBed.createComponent(MealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
