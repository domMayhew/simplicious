import { Component, ViewChild } from '@angular/core';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { Recipe } from '../model';
import { RecipesService } from '../services/recipes.service';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [CommonModule, WithNavComponent, RecipeComponent, MatButtonModule]
})
export class RecipesComponent {
  @ViewChild(RecipeComponent) firstRecipe: RecipeComponent | undefined;

  recipes: Recipe[] = [];

  constructor(private readonly recipesService: RecipesService) {
    this.recipes = recipesService.getRecipes();
  }

  newRecipe() {
    this.recipes.unshift({
      title: 'Untitled',
      requirements: []
    });

    setTimeout(() => {
      console.log(this.firstRecipe);
      this.firstRecipe?.scrollIntoView();
      if (this.firstRecipe) {
        this.firstRecipe.editing = true;
      }
    }, 0);
  }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.indexOf(recipe);
    if (index >= 0) {
      this.recipes.splice(index, 1);
    }
  }
}
