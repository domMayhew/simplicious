import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Alternatives, OrAlternatives, } from '../model/common.model';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe.model';
import { Habit, Routine } from '../model/routine.model';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, mergeMap } from 'rxjs';
import { ArrayService } from './array.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  readonly routines$: BehaviorSubject<Routine[]> = new BehaviorSubject([] as Routine[]);

  constructor(
    private readonly http: HttpClient,
    private readonly recipeService: RecipeService,
    private readonly arrayService: ArrayService) {
    const jsonRoutines$ = http.get<any>('/assets/json/defaultRoutines.json');
    const routinesObs$ = jsonRoutines$.pipe(
      mergeMap(
        (routines: any) =>
          combineLatest(_.map(routines, this.routineFromJson.bind(this)))
      )
    )
    routinesObs$.subscribe(this.routines$);
  }

  addRoutine = (routine: Routine) => {
    this.routines$.next(
      this.arrayService.add(
        this.routines$.getValue(),
        routine
      )
    );
  }

  deleteRoutine = (i: number) => {
    this.routines$.next(
      this.arrayService.remove(this.routines$.getValue(), i)
    );
  }

  updateRoutine = (i: number) => (routine: Routine) => {
    this.routines$.next(
      this.arrayService.update(
        this.routines$.getValue(),
        i,
        routine
      )
    );
  }

  routineFromJson(json: any): Observable<Routine> {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }
    const id = json.id;
    const name = json.name;
    const habits$ = _.map(json.habits, this.habitFromJson.bind(this));
    return combineLatest(habits$).pipe(
      map(
        (habits: Habit[]) => new Routine(id, name, habits)
      )
    )
  }

  habitFromJson(json: any): Observable<Habit> {
    const id = json.id;
    const name = json.name;
    const recipesOrAlternatives$ = _.map(json.recipes, this.recipeOrAlternativeFromJson.bind(this));
    return combineLatest(recipesOrAlternatives$).pipe(
      map(
        (recipesOrAlternatives: OrAlternatives<Recipe | undefined>[]) =>
          recipesOrAlternatives.filter(oa => oa !== undefined) as OrAlternatives<Recipe>[]),
      map(
        (recipesOrAlternatives: OrAlternatives<Recipe>[]) =>
          new Habit(id, name, recipesOrAlternatives)
      )
    );
  }

  recipeOrAlternativeFromJson(nameOrAlternatives: string | { name: string, recipes: string[] }):
    Observable<OrAlternatives<Recipe> | undefined> {
    if (typeof nameOrAlternatives === 'string') {
      return this.recipeService.getRecipeByName(nameOrAlternatives);
    } else {
      const name = nameOrAlternatives.name;
      const recipeNames = nameOrAlternatives.recipes;
      const recipes$ = _.map(recipeNames, rName => this.recipeService.getRecipeByName(rName));
      return combineLatest(recipes$).pipe(
        map(
          (recipes: (Recipe | undefined)[]) =>
            recipes.map(r => r === undefined ? this.recipeService.nullRecipe : r) as Recipe[]),
        map(
          (recipes: (Recipe)[]) =>
            new Alternatives(name, recipes)
        )
      );
    }
  }
}
