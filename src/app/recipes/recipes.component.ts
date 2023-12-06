import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Observable } from 'rxjs';
import { UUID } from '../model/user.model';
import { MainFab } from '../ui/main-fab.component';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [
    CommonModule,
    WithNavComponent,
    RecipeComponent,
    MatButtonModule,
    MainFab,
  ]
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
    const id = UUID.randomUUID();
    this.recipeService.addRecipe(
      new Recipe(id, 'Untitled Recipe', [], [], this.recipeService.defaultImage())
    );

    setTimeout(() => {
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

  identifyRecipe(index: number, recipe: Recipe): string {
    return recipe.name;
  }
}
