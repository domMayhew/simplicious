import { Observable, combineLatest, map, merge } from "rxjs";
import { Ingredient, Recipe } from "./recipe.model";
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
  readonly usedBy: Observable<Recipe[]>

  constructor(
    private readonly recipeService: RecipeService,
    readonly id: UUID,
    readonly ingredient: Ingredient,
    usedBy: UUID[],
    public checked: boolean = false,
  ) {
    const recipes$ = usedBy.map(id => this.recipeService.getPopulatedRecipeById(id).pipe(
      map(maybeRecipe => maybeRecipe ? maybeRecipe : this.recipeService.nullRecipe(id))
    ));
    this.usedBy = combineLatest(recipes$)
  }

  setChecked(isChecked: boolean) {
    this.checked = isChecked;
  }
}