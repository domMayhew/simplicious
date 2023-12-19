import * as _ from 'lodash';
import { Alternatives, ArgValidator, OrAlternatives, OrAlternativesJson, OrPopulatedAlternatives, add, isAlternatives, orAlternativeFromObj, orAlternativesToObj, remove, update } from './common.model';
import { Recipe, RecipeJson, Image } from './recipe.model';
import { UUID } from './user.model';
import { Observable, combineLatest, map, mapTo } from 'rxjs';

export class Routine extends ArgValidator {
  private iteration = 0;

  constructor(readonly id: UUID, readonly name: string, readonly habits: Habit[]) {
    super([id, name, habits]);
  }

  rename(name: string) {
    return new Routine(this.id, name, this.habits);
  }

  addHabit(habit: Habit) {
    return new Routine(this.id, this.name, add(this.habits, habit));
  }

  updateHabit(i: number, habit: Habit) {
    return new Routine(this.id, this.name, update(this.habits, i, habit));
  }

  deleteHabit(i: number) {
    return new Routine(this.id, this.name, remove(this.habits, i));
  }

  iterate() {
    const r = new Routine(this.id, this.name, this.habits);
    r.iteration++;
    return r;
  }

  getIteration() {
    return this.iteration;
  }

  static fromObj(defaultImage: Image, getRecipes: (ids: UUID[]) => Observable<Recipe[]>) {
    return function (json: RoutineJson): Observable<Routine> {
      const id = UUID.fromString(json.id);
      const name = json.name;
      const habits$ = json.habits.map(Habit.fromObj(defaultImage, getRecipes));
      return combineLatest(habits$).pipe(
        map(habits => new Routine(id, name, habits)))
    }
  }

  static toObj(routine: Routine): RoutineJson {
    return {
      id: routine.id.toString(),
      name: routine.name,
      habits: routine.habits.map(Habit.toObj)
    };
  }
}

export interface RoutineJson {
  id: string;
  name: string;
  habits: HabitJson[];
}
export class PopulatedRoutine extends Routine {
  constructor(id: UUID, name: string, override readonly habits: PopulatedHabit[]) {
    super(id, name, habits);
  }
}

export class Habit extends ArgValidator {
  constructor(readonly id: UUID, readonly name: string, readonly recipes: OrAlternatives<Recipe>[]) {
    super([id, name, recipes]);
  }

  rename(name: string) {
    return new Habit(this.id, name, this.recipes);
  }

  addRecipe(r: Recipe) {
    return new Habit(this.id, this.name, add(this.recipes, r));
  }

  updateOrAlternatives(i: number, oa: OrAlternatives<Recipe>) {
    return new Habit(this.id, this.name, update(this.recipes, i, oa));
  }

  deleteOrAlternatives(i: number) {
    return new Habit(this.id, this.name, remove(this.recipes, i));
  }

  static fromObj(defaultImage: Image, getRecipes: (ids: UUID[]) => Observable<Recipe[]>): (json: HabitJson) => Observable<Habit> {
    return function (json: HabitJson): Observable<Habit> {
      const id = UUID.fromString(json.id);
      const name = json.name;
      const recipesOrAlternatives$
        = json.recipes.map((idOrAlternatives: string | { name: string, recipes: string[] }) => {
          if (typeof idOrAlternatives !== 'string') {
            const name = idOrAlternatives.name;
            const recipes$ = getRecipes(idOrAlternatives.recipes.map(UUID.fromString));
            const alternatives$: Observable<OrAlternatives<Recipe>>
              = recipes$.pipe(
                map(
                  (recipes: Recipe[]) => new Alternatives(name, recipes)
                )
              );
            return alternatives$;
          } else {
            return getRecipes([UUID.fromString(idOrAlternatives)]).pipe(map(recipes => recipes[0]));
          }
        });
      return combineLatest(recipesOrAlternatives$).pipe(
        map(
          (recipesOrAlternatives: OrAlternatives<Recipe | undefined>[]) =>
            recipesOrAlternatives.filter(oa => oa !== undefined) as OrAlternatives<Recipe>[]),
        map(
          (recipesOrAlternatives: OrAlternatives<Recipe>[]) =>
            new Habit(id, name, recipesOrAlternatives)
        )
      )
    }
  }

  static toObj(habit: Habit): HabitJson {
    return {
      id: habit.id.toString(),
      name: habit.name,
      recipes: habit.recipes.map((rOrAlternative: OrAlternatives<Recipe>) => {
        if (isAlternatives(rOrAlternative)) {
          return {
            name: rOrAlternative.name,
            recipes: rOrAlternative.alternatives.map(r => r.id.toString())
          };
        } else {
          return rOrAlternative.id.toString();
        }
      })
    }
  }
}

export interface HabitJson {
  id: string;
  name: string;
  recipes: (string | { name: string, recipes: string[] })[]
}

export class PopulatedHabit extends Habit {
  constructor(id: UUID, name: string, override readonly recipes: OrPopulatedAlternatives<Recipe>[]) {
    super(id, name, recipes);
  }
}

export enum DAYS_OF_WEEK {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday"
}