import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Ingredient, Recipe } from '../../../model/recipe.model';
import { IngredientListComponent } from '../ingredient-list/ingredient-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecipeInstructionsComponent } from '../recipe-instructions/recipe-instructions.component';
import { MenuItem, SettingsButtonComponent } from 'src/app/ui/settings-button.component';
import { CardComponent } from 'src/app/ui/card.component';
import { MenuItemName } from 'src/app/ui/settings-button.component';
import { OrAlternatives } from 'src/app/model/common.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  standalone: true,
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    IngredientListComponent,
    RecipeInstructionsComponent,
    SettingsButtonComponent,
    CardComponent,
  ]
})
export class RecipeModalComponent {
  recipe!: Recipe;
  index!: number;
  editing = false;
  @Output('updateRecipe') updateRecipeEvent: EventEmitter<Recipe> = new EventEmitter();
  @Output('deleteRecipe') deleteRecipeEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: {
      recipe: Recipe, index: number
    },
    private readonly dialogRef: MatDialogRef<RecipeModalComponent>,
    private readonly recipeService: RecipeService) {
    this.recipe = data.recipe;
    this.index = data.index;
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.editing) {
        this.recipeService.updateRecipe(this.index, this.recipe);
      }
    });
  }

  menuItemSelected(item: MenuItem) {
    switch (item.name) {
      case MenuItemName.EDIT:
        this.setEditing(true);
        break;
      case MenuItemName.DELETE:
        this.deleteRecipe();
        break;
    }
  }

  setEditing(value: boolean) {
    this.editing = value;
    if (!this.editing) {
      this.recipeService.updateRecipe(this.index, this.recipe);
    }
  }

  rename(name: string) {
    this.recipe = this.recipe.rename(name);
  }

  updateIngredients(ingredients: OrAlternatives<Ingredient>[]) {
    this.recipe = this.recipe.updateIngredients(ingredients);
  }

  updateInstructions(instructions: string[]) {
    this.recipe = this.recipe.updateInstructions(instructions);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.dialogRef.close();
  }
}