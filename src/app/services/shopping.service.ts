import { Injectable } from '@angular/core';
import { PopulatedHabit, PopulatedRoutine } from '../model/routine.model';
import { ShoppingItem, ShoppingList } from '../model/shopping.model';
import { OrPopulatedAlternatives, isAlternatives } from '../model/common.model';
import { RecipeService } from './recipe.service';
import { Ingredient, PopulatedRecipe, Recipe } from '../model/recipe.model';
import { UUID } from '../model/user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ArrayService } from './array.service';
import { isNgTemplate } from '@angular/compiler';
import { getValues } from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private lists = new BehaviorSubject<ShoppingList[]>([]);

  constructor(private readonly recipeService: RecipeService,
    private readonly arrayService: ArrayService,
    private readonly http: HttpClient) {
  }

  getLists = (): Observable<ShoppingList[]> => {
    return this.lists;
  }

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
      this.updateQuantityMap(quantityMap, ingredient);
      this.updateSourceMap(sourceMap, ingredient, populatedRecipe);
    })

    const items: ShoppingItem[] = Array.from(quantityMap).map(([name, ingredient]) => {
      return new ShoppingItem(
        UUID.randomUUID(),
        ingredient,
        sourceMap.get(name) || []
      )
    });

    const newList = new ShoppingList(UUID.randomUUID(), new Date(), items);
    const oldLists = this.lists.getValue();
    this.lists.next(
      this.arrayService.addToStart(oldLists, newList)
    );
    return newList;
  }

  addRecipe = (list: ShoppingList) => (recipeId: UUID): Observable<ShoppingList> => {

    const recipe$ = this.recipeService.getRecipeById(recipeId);
    return recipe$.pipe(map(recipe => {
      if (recipe === undefined) {
        throw new Error(`Cannot add recipe [${recipeId}] to list because it could not be found.`);
      }

      const populatedRecipe = this.recipeService.populate(recipe);
      const newIngredients = populatedRecipe.getIngredients();
      const oldItems: ShoppingItem[] = list.items;
      const newItems = this.mergeNewIngredientsWithItems([recipe.id, recipe.name])(oldItems)(newIngredients);
      return new ShoppingList(list.id, list.date, newItems);
    }))
  }

  private mergeNewIngredientsWithItems = (recipeName: [UUID, string]) => (items: ShoppingItem[]) => (ingredients: Ingredient[]): ShoppingItem[] => {
    const findItem = (items: ShoppingItem[]) => (ingredient: Ingredient): number => {
      return items.findIndex(item => item.ingredient.name === ingredient.name);
    }

    ingredients.forEach(ingredient => {
      const oldItemIndex = findItem(items)(ingredient);
      const oldItem = oldItemIndex >= 0 ? items[oldItemIndex] : undefined;
      const sumIngredient = oldItem ? this.addIngredients(oldItem.ingredient, ingredient) : ingredient;
      const oldUsedBy = oldItem?.usedBy || [];
      const newItem = new ShoppingItem(
        oldItem?.id || UUID.randomUUID(),
        sumIngredient,
        [...oldUsedBy, [ingredient, recipeName[1], recipeName[0]]]
      )
      if (oldItem) {
        items[oldItemIndex] = newItem;
      } else {
        items.push(newItem);
      }
    });

    return items;
  }

  updateList = (i: number) => (list: ShoppingList): void => {
    const oldLists = this.lists.getValue();
    const newLists = this.arrayService.update(oldLists, i, list);
    this.lists.next(newLists);
  }

  deleteList = (i: number): void => {
    const oldLists = this.lists.getValue();
    const newLists = this.arrayService.remove(oldLists, i);
    this.lists.next(newLists);
  }

  private updateQuantityMap(quantityMap: Map<string, Ingredient>, ingredient: Ingredient): void {
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
      throw new Error(`Adding ingredients with different units is not supported yet. [ ${left.name} ]`);
    }
  }
}
