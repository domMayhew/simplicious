import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from 'src/app/model';
import { RecipesService } from 'src/app/services/recipes.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-routine-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './routine-recipe.component.html',
  styleUrls: ['./routine-recipe.component.scss'],
})
export class RoutineRecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Input() editing = false;
  @Output('changeRecipe') changeRecipeEvent: EventEmitter<Recipe> = new EventEmitter();

  recipes: Recipe[];
  defaultImageUrl: string;
  defaultImageCaption: string;

  autoRecipeControl: FormControl = new FormControl('');

  constructor(private readonly recipesService: RecipesService) {
    [this.defaultImageUrl, this.defaultImageCaption] = this.recipesService.defaultImage();
    this.recipes = recipesService.getRecipes();
  }

  changeRecipe(newRecipeTitle: string): void {
    const newRecipe = this.recipes.find(r => r.title === newRecipeTitle);
    this.changeRecipeEvent.emit(newRecipe);
  }
}
