interface Recipe {
  title: string;
  items: IngredientSelection[];
  instructions?: string[];
  image?: {
    url: string;
    caption: string;
  }
}

interface IngredientSelection {
  options: Ingredient[];
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
  Recipe, IngredientSelection, Ingredient, SelectionMethod
}