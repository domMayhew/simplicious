import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Observable } from "rxjs";
import { Ingredient, Recipe } from "src/app/model/recipe.model";
import { ShoppingItem, ShoppingList } from "src/app/model/shopping.model";
import { UUID } from "src/app/model/user.model";
import { RecipeSelectComponent } from "src/app/recipes/recipe-select/recipe-select.component";
import { AddIngredientForm } from "src/app/recipes/recipe/ingredient-list/new-ingredient-form/add-ingredient-form.component";
import { RecipeService } from "src/app/services/recipe.service";
import { ShoppingService } from "src/app/services/shopping.service";
import { CardComponent } from "src/app/ui/card.component";
import { CheckboxComponent } from "src/app/ui/checkbox.component";
import { DELETE_MENU_ITEM, EDIT_MENU_ITEM, MenuItem, MenuItemName, SettingsButtonComponent } from "src/app/ui/settings-button.component";

@Component({
  standalone: true,
  selector: 'app-shopping-list',
  imports: [
    CommonModule,
    CheckboxComponent,
    MatTooltipModule,
    CardComponent,
    SettingsButtonComponent,
    AddIngredientForm,
    MatMenuModule,
    RecipeSelectComponent,
    MatButtonModule,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  @Input({ required: true }) shoppingList!: ShoppingList;
  @Input() editing = false;
  @Output() update = new EventEmitter<ShoppingList>();
  @Output() delete = new EventEmitter<void>();

  recipeNames$!: Observable<[UUID, string][]>;
  menuItems = [
    { name: MenuItemName.CLEAR, icon: "clear_all" },
    EDIT_MENU_ITEM,
    DELETE_MENU_ITEM
  ]

  constructor(private readonly recipeService: RecipeService, private readonly shoppingService: ShoppingService) {
    this.recipeNames$ = recipeService.currentUserRecipeNames();
  }

  toggleChecked = (i: number) => {
    this.shoppingList.items[i].toggleChecked();
    this.update.emit(this.shoppingList);
  }

  uncheckAll = () => {
    this.shoppingList.items.forEach(item => item.setChecked(false));
  }

  tooltip = (item: ShoppingItem): string => {
    if (item.usedBy.length < 1) {
      return 'Not used in any recipes';
    } else if (item.usedBy.length === 1) {
      return item.usedBy.map(([ingredient, recipeName, recipeId]) => `${recipeName}`).join('');
    } else {
      return item.usedBy.map(([ingredient, recipeName, recipeId]) => `${recipeName} (${ingredient.quantity}${ingredient.units ? ` ${ingredient.units}` : ''})`)
        .join(", ");
    }
  }

  addIngredient(ingredient: Ingredient): void {
    const item = new ShoppingItem(UUID.randomUUID(), ingredient, []);
    this.update.emit(
      this.shoppingList.addItem(item)
    );
  }

  addRecipe = (recipeName: [UUID, string]): void => {
    const newList$ = this.shoppingService.addRecipe(this.shoppingList)(recipeName[0]);
    newList$.subscribe(list => this.update.emit(list));
  }

  menuItemSelected(item: MenuItem): void {
    switch (item.name) {
      case MenuItemName.CLEAR:
        this.uncheckAll();
        break;
      case MenuItemName.EDIT:
        this.editing = true;
        break;
      case MenuItemName.DELETE:
        this.delete.emit();
        break;
    }
  }
}