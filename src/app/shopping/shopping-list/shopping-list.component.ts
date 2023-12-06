import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ShoppingItem, ShoppingList } from "src/app/model/shopping.model";
import { RecipeService } from "src/app/services/recipe.service";
import { CardComponent } from "src/app/ui/card.component";
import { CheckboxComponent } from "src/app/ui/checkbox.component";
import { DELETE_MENU_ITEM, MenuItem, MenuItemName, SettingsButtonComponent } from "src/app/ui/settings-button.component";

@Component({
  standalone: true,
  selector: 'app-shopping-list',
  imports: [CommonModule, CheckboxComponent, MatTooltipModule, CardComponent, SettingsButtonComponent],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  @Input({ required: true }) shoppingList!: ShoppingList;
  @Output() update = new EventEmitter<ShoppingList>();
  @Output() delete = new EventEmitter<void>();

  menuItems = [
    { name: MenuItemName.CLEAR, icon: "clear_all" },
    DELETE_MENU_ITEM
  ]

  constructor(private readonly recipeService: RecipeService) { }

  toggleChecked = (i: number) => {
    this.shoppingList.items[i].toggleChecked();
    this.update.emit(this.shoppingList);
  }

  uncheckAll = () => {
    this.shoppingList.items.forEach(item => item.setChecked(false));
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

  menuItemSelected(item: MenuItem): void {
    switch (item.name) {
      case MenuItemName.CLEAR:
        this.uncheckAll();
        break;
      case MenuItemName.DELETE:
        this.delete.emit();
        break;
    }
  }
}