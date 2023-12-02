interface Recipe {
  title: string;
  requirements: Requirement[];
  instructions?: string[];
  image?: {
    url: string;
    caption: string;
  }
}

type Requirement = Option | Ingredient;

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

export type {
  Recipe, Requirement, Option, Ingredient, SelectionMethod
}