import { Injectable } from '@angular/core';
import { PopulatedHabit, PopulatedRoutine } from '../model/routine.model';
import { ShoppingItem, ShoppingList } from '../model/shopping.model';
import { isAlternatives } from '../model/common.model';
import { RecipeService } from './recipe.service';
import { Ingredient, PopulatedRecipe } from '../model/recipe.model';
import { UUID } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private readonly recipeService: RecipeService) { }

  generateList = (routine: PopulatedRoutine): ShoppingList => {
    const rawIngredientSources: [Ingredient, PopulatedRecipe][] =
      routine.habits
        .flatMap((habit: PopulatedHabit) => habit.recipes)
        .flatMap(recipeOrPopulatedGroup => {
          const recipe = isAlternatives(recipeOrPopulatedGroup) ?
            recipeOrPopulatedGroup.getChoice()
            : recipeOrPopulatedGroup;
          const populatedRecipe = this.recipeService.populate(recipe);
          const ingredients = populatedRecipe.getIngredients();
          return ingredients.map(ingredient => [ingredient, populatedRecipe] as [Ingredient, PopulatedRecipe]);
        })

    const sourceMap: Map<string, [Ingredient, string, UUID][]> = new Map();
    const quantityMap: Map<string, Ingredient> = new Map();
    rawIngredientSources.forEach(([ingredient, populatedRecipe]) => {
      this.quantityMap(quantityMap, ingredient);
      this.updateSourceMap(sourceMap, ingredient, populatedRecipe);
    })

    const items: ShoppingItem[] = Array.from(quantityMap).map(([name, ingredient]) => {
      return new ShoppingItem(
        UUID.randomUUID(),
        ingredient,
        sourceMap.get(name) || []
      )
    });

    return new ShoppingList(UUID.randomUUID(), new Date(), items);
  }

  private quantityMap(quantityMap: Map<string, Ingredient>, ingredient: Ingredient): void {
    const prevSumIngredient = quantityMap.get(ingredient.name);
    const newSumIngredient = prevSumIngredient ?
      this.addIngredients(prevSumIngredient, ingredient)
      : ingredient;
    quantityMap.set(ingredient.name, newSumIngredient);
  }

  private updateSourceMap(sourceMap: Map<string, [Ingredient, string, UUID][]>, ingredient: Ingredient, recipe: PopulatedRecipe): void {
    const prevSources = sourceMap.get(ingredient.name);
    const newSources = [...prevSources || [], [ingredient, recipe.name, recipe.id]] as [Ingredient, string, UUID][];
    sourceMap.set(ingredient.name, newSources);
  }

  private addIngredients(left: Ingredient, right: Ingredient): Ingredient {
    if (left.name !== right.name) {
      throw new Error("Cannot add two ingredients with different names");
    }

    if (left.units === right.units) {
      return new Ingredient(left.name, left.quantity + right.quantity, left.units);
    } else {
      throw new Error("adding ingredients with different units is not supported yet.");
    }
  }
}
