import * as _ from 'lodash';
import { ArgValidator, OrAlternatives, add, remove, update } from './common.model';
import { Recipe } from './recipe.model';

export class Routine extends ArgValidator {
  constructor(readonly name: string, readonly habits: Habit[]) {
    super([name, habits]);
  }

  rename(name: string) {
    return new Routine(name, this.habits);
  }

  addHabit(habit: Habit) {
    return new Routine(this.name, add(this.habits, habit));
  }

  updateHabit(i: number, habit: Habit) {
    return new Routine(this.name, update(this.habits, i, habit));
  }

  deleteHabit(i: number) {
    return new Routine(this.name, remove(this.habits, i));
  }
}

export class Habit extends ArgValidator {
  constructor(readonly name: string, readonly recipes: OrAlternatives<Recipe>[]) {
    super([name, recipes]);
  }

  rename(name: string) {
    return new Habit(name, this.recipes);
  }

  addRecipe(r: Recipe) {
    return new Habit(this.name, add(this.recipes, r));
  }

  updateOrAlternatives(i: number, oa: OrAlternatives<Recipe>) {
    return new Habit(this.name, update(this.recipes, i, oa));
  }

  deleteOrAlternatives(i: number) {
    return new Habit(this.name, remove(this.recipes, i));
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