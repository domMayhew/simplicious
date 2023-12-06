import { Observable, combineLatest, map, merge } from "rxjs";
import { Ingredient, PopulatedRecipe, Recipe } from "./recipe.model";
import { UUID } from "./user.model";
import { RecipeService } from "../services/recipe.service";

export class ShoppingList {
  constructor(
    readonly id: UUID,
    readonly date: Date,
    readonly items: ShoppingItem[]
  ) { }
}

export class ShoppingItem {
  constructor(
    readonly id: UUID,
    readonly ingredient: Ingredient,
    readonly usedBy: [Ingredient, string, UUID][],
    public checked: boolean = false,
  ) { }

  setChecked(isChecked: boolean) {
    this.checked = isChecked;
  }
}