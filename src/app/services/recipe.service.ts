import { Injectable } from '@angular/core';
import { Image, Ingredient, PopulatedRecipe, Recipe, RecipeJson } from '../model/recipe.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, UnaryFunction, combineLatest, map, pipe } from 'rxjs';
import * as _ from 'lodash';
import { UUID } from '../model/user.model';
import { Alternatives, OrAlternatives, PopulatedAlternatives, SelectionMethod, isAlternatives } from '../model/common.model';
import { AlternativesService } from './alternatives.service';
import { getValues, persistValues } from './helper';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  LOCAL_STORAGE_KEY = "RECIPES";

  recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject([] as Recipe[]);

  constructor(private readonly http: HttpClient, private readonly alternativesService: AlternativesService) {
    const recipes$ = getValues<Recipe, RecipeJson>(
      http,
      this.LOCAL_STORAGE_KEY,
      '/assets/json/defaultRecipes.json',
      Recipe.fromObj(this.defaultImage()));
    recipes$.subscribe(recipes => this.recipes.next(recipes));
    this.recipes.subscribe(persistValues<Recipe, RecipeJson>(this.LOCAL_STORAGE_KEY, Recipe.toObj));
  }

  currentUserRecipes(): Observable<Recipe[]> {
    return this.recipes;
  }

  currentUserRecipeNames(): Observable<[UUID, string][]> {
    return this.recipes.pipe(map(recipes => recipes.map(r => [r.id, r.name])));
  }

  getRecipeByName(name: string): Observable<Recipe | undefined> {
    return this.recipes.pipe(
      map((recipes: Recipe[]) => recipes.find(r => r.name === name)),
      this.sanitize
    );
  }

  getRecipeById(id: UUID): Observable<Recipe> {
    return this.recipes.pipe(
      map((recipes: Recipe[]) => recipes.find(r => r.id.equals(id))),
      this.sanitize
    )
  }

  getRecipesByIds(ids: UUID[]): Observable<Recipe[]> {
    return combineLatest(ids.map(this.getRecipeById.bind(this)));
  }

  getRandomRecipe(): Observable<Recipe> {
    return this.recipes.pipe(
      map(recipes => {
        const index = Math.floor(Math.random() * recipes.length);
        return recipes[index];
      })
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
