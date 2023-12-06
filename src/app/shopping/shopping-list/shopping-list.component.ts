import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { map } from "rxjs";
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

  constructor(private readonly recipeService: RecipeService) { }

  toggleChecked = (i: number) => {
    this.shoppingList.items[i].toggleChecked();
  }

  tooltip = (item: ShoppingItem): string => {
    if (item.usedBy.length < 1) {
      return '';
    } else if (item.usedBy.length === 1) {
      return item.usedBy.map(([ingredient, recipeName, recipeId]) => `${recipeName}`).join('');
    } else {
      return item.usedBy.map(([ingredient, recipeName, recipeId]) => `${recipeName} (${ingredient.quantity}${ingredient.units ? ` ${ingredient.units}` : ''})`)
        .join(", ");
    }
  }
}