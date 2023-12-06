import { Injectable } from '@angular/core';
import { Image, Ingredient, PopulatedRecipe, Recipe, RecipeJson } from '../model/recipe.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, UnaryFunction, map, pipe } from 'rxjs';
import * as _ from 'lodash';
import { UUID } from '../model/user.model';
import { Alternatives, OrAlternatives, PopulatedAlternatives, SelectionMethod, isAlternatives } from '../model/common.model';
import { AlternativesService } from './alternatives.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject([] as Recipe[]);

  constructor(private readonly http: HttpClient, private readonly alternativesService: AlternativesService) {
    const res = this.http.get<RecipeJson[]>('/assets/json/defaultRecipes.json');
    const recipeInstances = res.pipe(
      map(
        (recipes: RecipeJson[]) => _.map(recipes, Recipe.fromObj(this.defaultImage()))
      )
    )
    recipeInstances.subscribe(instances => this.recipes.next(instances));
  }

  currentUserRecipes(): BehaviorSubject<Recipe[]> {
    return this.recipes;
  }

  getRecipeByName(name: string): Observable<Recipe | undefined> {
    return this.recipes.pipe(
      map((recipes: Recipe[]) => recipes.find(r => r.name === name)),
      this.sanitize
    );
  }

  getRecipeById(id: UUID): Observable<Recipe | undefined> {
    return this.recipes.pipe(
      map((recipes: Recipe[]) => recipes.find(r => r.id.equals(id))),
      this.sanitize
    )
  }

  populate = (recipe: Recipe): PopulatedRecipe => {
    const populatedIngredients = recipe.ingredients
      .map(ingredientOrGroup => {
        if (isAlternatives(ingredientOrGroup)) {
          const choice = this.alternativesService.chooseAlternative(recipe.getIteration())(ingredientOrGroup);
          return ingredientOrGroup.populateWith(choice);
        } else {
          return ingredientOrGroup;
        }
      });
    const id = UUID.randomUUID();
    return new PopulatedRecipe(id, recipe.name, populatedIngredients, recipe.instructions, recipe.image);
  }

  addRecipe(recipe: Recipe) {
    const oldRecipes = this.recipes.getValue();
    this.recipes.next([recipe, ...oldRecipes]);
  }

  deleteRecipe(i: number) {
    const prefix = this.recipes.getValue().slice(0, i);
    const suffix = this.recipes.getValue().slice(i + 1);
    this.recipes.next([...prefix, ...suffix]);
  }

  updateRecipe(i: number, recipe: Recipe) {
    const prefix = this.recipes.getValue().slice(0, i);
    const suffix = this.recipes.getValue().slice(i + 1);
    this.recipes.next([...prefix, recipe, ...suffix]);
  }

  sanitize: UnaryFunction<Observable<Recipe | undefined>, Observable<Recipe>> =
    pipe(map((recipe: Recipe | undefined) => recipe ? recipe : this.nullRecipe()));

  defaultImage(): Image {
    return new Image(
      '/assets/images/dinner-plate.jpg',
      'https://www.cb2.ca/frank-white-dinner-plate/s153072'
    );
  }

  nullRecipe(id?: UUID, name?: string): Recipe {
    return new Recipe(
      id || UUID.randomUUID(),
      name || "Untitled Recipe",
      [],
      [],
      new Image('/assets/icons/error.svg',
        'This recipe may have been deleted, or an error may have occurred'))
  }

}
