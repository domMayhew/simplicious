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

  addItem(item: ShoppingItem): ShoppingList {
    return new ShoppingList(
      this.id, this.date, [...this.items, item]
    );
  }
}

export class ShoppingItem {
  constructor(
    readonly id: UUID,
    readonly ingredient: Ingredient,
    readonly usedBy: [Ingredient, string, UUID][],
    public checked: boolean = false,
  ) { }

  toggleChecked() {
    this.checked = !this.checked;
  }

  setChecked(isChecked: boolean) {
    this.checked = isChecked;
  }
}