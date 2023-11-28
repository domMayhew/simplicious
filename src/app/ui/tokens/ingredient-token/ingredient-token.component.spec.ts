import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTokenComponent } from './ingredient-token.component';

describe('IngredientTokenComponent', () => {
  let component: IngredientTokenComponent;
  let fixture: ComponentFixture<IngredientTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientTokenComponent]
    });
    fixture = TestBed.createComponent(IngredientTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
