import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Image, Ingredient, Recipe } from '../../model/recipe.model';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecipeInstructionsComponent } from './recipe-instructions/recipe-instructions.component';
import { MenuItem, SettingsButtonComponent } from 'src/app/ui/settings-button.component';
import { RecipeService } from 'src/app/services/recipe.service';
import { CardComponent } from 'src/app/ui/card.component';
import { MenuItemName } from 'src/app/ui/settings-button.component';
import { OrAlternatives } from 'src/app/model/common.model';

@Component({
  standalone: true,
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
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
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Input() editing = false;
  @Output('updateRecipe') updateRecipeEvent: EventEmitter<Recipe> = new EventEmitter();
  @Output('deleteRecipe') deleteRecipeEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly ref: ElementRef<HTMLElement>,
    private readonly recipeService: RecipeService) { }

  menuItemSelected(item: MenuItem) {
    switch (item.name) {
      case MenuItemName.EDIT:
        this.setEditing(true);
        break;
      case MenuItemName.DELETE:
        this.deleteRecipeEvent.emit();
        break;
    }
  }

  setEditing(value: boolean) {
    this.editing = value;
  }

  rename(name: string) {
    this.updateRecipeEvent.emit(this.recipe.rename(name));
  }

  updateIngredients(ingredients: OrAlternatives<Ingredient>[]) {
    this.updateRecipeEvent.emit(this.recipe.updateIngredients(ingredients));
  }

  updateInstructions(instructions: string[]) {
    this.updateRecipeEvent.emit(this.recipe.updateInstructions(instructions));
  }

  deleteRecipe() {
    this.deleteRecipeEvent.emit();
  }

  scrollIntoView() {
    this.ref.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}