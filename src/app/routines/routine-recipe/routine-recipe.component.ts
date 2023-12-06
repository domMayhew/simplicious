import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Image, Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { OrAlternatives } from 'src/app/model/common.model';


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
  @Input({ required: true }) recipe!: OrAlternatives<Recipe>;
  @Input() editing = false;
  @Output() update: EventEmitter<Recipe> = new EventEmitter();

  recipes: Observable<Recipe[]>;
  defaultImage: Image;

  autoRecipeControl: FormControl = new FormControl('');

  constructor(private readonly recipeService: RecipeService) {
    this.defaultImage = this.recipeService.defaultImage();
    this.recipes = recipeService.currentUserRecipes();
  }

  // changeRecipe(newRecipeTitle: string): void {
  //   const newRecipe = this.recipes.find(r => r.title === newRecipeTitle);
  //   this.changeRecipeEvent.emit(newRecipe);
  // }
}
