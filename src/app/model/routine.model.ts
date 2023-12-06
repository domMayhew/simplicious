import * as _ from 'lodash';
import { ArgValidator, OrAlternatives, OrPopulatedAlternatives, add, isAlternatives, remove, update } from './common.model';
import { Recipe } from './recipe.model';
import { UUID } from './user.model';

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
}

export class PopulatedRoutine extends Routine {
  constructor(id: UUID, name: string, habits: PopulatedHabit[]) {
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
}

export class PopulatedHabit extends Habit {
  constructor(id: UUID, name: string, recipes: OrPopulatedAlternatives<Recipe>[]) {
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