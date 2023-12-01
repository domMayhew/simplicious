import { IngredientQuantityPipe } from './ingredient-quantity.pipe';

describe('IngredientStringPipe', () => {
  it('create an instance', () => {
    const pipe = new IngredientQuantityPipe();
    expect(pipe).toBeTruthy();
  });
});
