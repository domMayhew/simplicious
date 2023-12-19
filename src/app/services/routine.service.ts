import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Alternatives, OrAlternatives, isAlternatives, } from '../model/common.model';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe.model';
import { Habit, HabitJson, PopulatedHabit, PopulatedRoutine, Routine } from '../model/routine.model';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, mergeAll, mergeMap } from 'rxjs';
import { ArrayService } from './array.service';
import { AlternativesService } from './alternatives.service';
import { UUID } from '../model/user.model';
import { getValues, persistValues } from './helper';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  LOCAL_STORAGE_KEY = "ROUTINES";

  readonly routines$: BehaviorSubject<Routine[]> = new BehaviorSubject([] as Routine[]);

  constructor(
    private readonly http: HttpClient,
    private readonly recipeService: RecipeService,
    private readonly arrayService: ArrayService,
    private readonly alternativesService: AlternativesService) {
    const routines$ =
      getValues(
        http,
        this.LOCAL_STORAGE_KEY,
        'assets/json/defaultRoutines.json',
        Routine.fromObj(recipeService.defaultImage(), recipeService.getRecipesByIds.bind(recipeService))).pipe(
          map(rs => combineLatest(rs)),
          mergeAll());
    routines$.subscribe(this.routines$);
    this.routines$.subscribe(persistValues(this.LOCAL_STORAGE_KEY, Routine.toObj));
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
}
