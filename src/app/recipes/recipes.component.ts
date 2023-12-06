import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [CommonModule, WithNavComponent, RecipeComponent, MatButtonModule]
})
export class RecipesComponent {

  @ViewChild(RecipeComponent) firstRecipe: RecipeComponent | undefined;

  recipes: Observable<Recipe[]>;

  constructor(private readonly recipeService: RecipeService) {
    this.recipes = recipeService.currentUserRecipes();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  newRecipe = (): void => {
    this.recipeService.addRecipe(
      new Recipe('Untitled Recipe', [], [], this.recipeService.defaultImage())
    );

    setTimeout(() => {
      console.log(this.firstRecipe);
      this.firstRecipe?.scrollIntoView();
      if (this.firstRecipe) {
        this.firstRecipe.editing = true;
      }
    }, 0);
  }

  deleteRecipe = (i: number): void => {
    this.recipeService.deleteRecipe(i);
  }

  updateRecipe = (i: number) => (recipe: Recipe): void => {
    this.recipeService.updateRecipe(i, recipe);
  }
}
