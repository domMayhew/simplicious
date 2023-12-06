import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ShoppingItem, ShoppingList } from "src/app/model/shopping.model";
import { RecipeService } from "src/app/services/recipe.service";
import { CheckboxComponent } from "src/app/ui/checkbox.component";

@Component({
  standalone: true,
  selector: 'app-shopping-list',
  imports: [CommonModule, CheckboxComponent, MatTooltipModule],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  @Input({ required: true }) shoppingList!: ShoppingList;

  constructor(private readonly recipeService: RecipeService) {
    // this.shoppingList = new ShoppingList(
    //   UUID.randomUUID(),
    //   new Date(),
    //   [
    //     new ShoppingItem(
    //       UUID.randomUUID(),
    //       new Ingredient('chicken breasts', 2),
    //       [[new Ingredient('coleslaw', 1, 'bag'), 'Fish Tacos', UUID.fromString("84ce2f66-43fa-4203-83b7-398b448449a8")]] as [Ingredient, string, string][]
    //     ), new ShoppingItem(
    //       UUID.randomUUID(),
    //       new Ingredient('chicken breasts', 2),
    //       []
    //     ), new ShoppingItem(
    //       UUID.randomUUID(),
    //       new Ingredient('chicken breasts', 2),
    //       []
    //     ), new ShoppingItem(
    //       UUID.randomUUID(),
    //       new Ingredient('chicken breasts', 2),
    //       []
    //     )
    //   ]
    // )
  }

  check = (i: number, isChecked: boolean) => {
    this.shoppingList.items[i].setChecked(isChecked);
  }

  tooltip = (item: ShoppingItem): string => {
    return item.usedBy.map(([ingredient, recipeName, recipeId]) => `${ingredient.quantity} ${ingredient.units} (${recipeName})`)
      .join(", ");
  }
}