// Recipes

interface Recipe {
  title: string;
  requirements: RecipeRequirement[];
  instructions?: string[];
  image?: {
    url: string;
    caption: string;
  }
}

type RecipeRequirement = Option | Ingredient;

interface Option {
  options: Ingredient[];
  name?: string;
  method?: SelectionMethod;
}

interface Ingredient {
  readonly name: string;
  readonly quantity: number;
  readonly units?: string;
}

enum SelectionMethod {
  RANDOM,
  ORDERED,
  DEFAULT
}

// Routines

interface Routine {
  name: string;
  days: RoutineDay[];
  groups: RoutineGroup[];
}

interface RoutineGroup {
  name: string;
  recipes: Recipe[];
  method: SelectionMethod;
}

interface RoutineDay extends RoutineGroup {
  name: DAYS_OF_WEEK;
}

enum DAYS_OF_WEEK {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday"
}

export type {
  Recipe,
  RecipeRequirement,
  Option,
  Ingredient,
  Routine,
  RoutineDay,
  RoutineGroup,
}

export { DAYS_OF_WEEK, SelectionMethod }