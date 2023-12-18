import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Alternatives, OrAlternatives, isAlternatives, } from '../model/common.model';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe.model';
import { Habit, PopulatedHabit, PopulatedRoutine, Routine } from '../model/routine.model';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, mergeMap } from 'rxjs';
import { ArrayService } from './array.service';
import { AlternativesService } from './alternatives.service';
import { UUID } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  readonly routines$: BehaviorSubject<Routine[]> = new BehaviorSubject([] as Routine[]);

  constructor(
    private readonly http: HttpClient,
    private readonly recipeService: RecipeService,
    private readonly arrayService: ArrayService,
    private readonly alternativesService: AlternativesService) {
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

  populate = (routine: Routine): PopulatedRoutine => {
    const populatedHabits = routine.habits.map(habit => {
      const populatedRecipeGroups = habit.recipes.map(recipeOrGroup => {
        if (isAlternatives(recipeOrGroup)) {
          const recipeChoice = this.alternativesService.chooseAlternative(routine.getIteration())(recipeOrGroup);
          return recipeOrGroup.populateWith(recipeChoice);
        } else {
          return recipeOrGroup;
        }
      });
      const id = UUID.randomUUID();
      const populatedHabit = new PopulatedHabit(id, habit.name, populatedRecipeGroups);
      return populatedHabit;
    })
    const id = UUID.randomUUID();
    return new PopulatedRoutine(id, routine.name, populatedHabits);
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

  recipeOrAlternativeFromJson(idOrAlternatives: string | { name: string, recipes: string[] }):
    Observable<OrAlternatives<Recipe> | undefined> {
    if (typeof idOrAlternatives === 'string') {
      return this.recipeService.getRecipeById(UUID.fromString(idOrAlternatives));
    } else {
      const name = idOrAlternatives.name;
      const recipeNames = idOrAlternatives.recipes;
      const recipes$ = _.map(recipeNames, id => this.recipeService.getRecipeById(UUID.fromString(id)));
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
