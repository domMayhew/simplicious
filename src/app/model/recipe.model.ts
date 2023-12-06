import * as _ from 'lodash';
import { ArgValidator, OrAlternatives, OrAlternativesJson, add, orAlternativeFromObj, remove, update } from './common.model';

export class Recipe extends ArgValidator {
  constructor(
    readonly name: string,
    readonly ingredients: OrAlternatives<Ingredient>[],
    readonly instructions: string[],
    readonly image: Image) {
    super([name, ingredients, instructions, image], "Recipe");
  }

  rename(name: string) {
    return new Recipe(name, this.ingredients, this.instructions, this.image);
  }

  updateIngredients(ingredients: OrAlternatives<Ingredient>[]) {
    return new Recipe(this.name, ingredients, this.instructions, this.image);
  }

  addIngredient(req: OrAlternatives<Ingredient>) {
    return new Recipe(this.name, add(this.ingredients, req), this.instructions, this.image);
  }

  deleteIngredient(i: number) {
    return new Recipe(this.name, remove(this.ingredients, i), this.instructions, this.image);
  }

  updateIngredient(i: number, req: OrAlternatives<Ingredient>) {

    return new Recipe(this.name, update(this.ingredients, i, req), this.instructions, this.image);
  }

  addInstruction(instruction: string) {
    return new Recipe(this.name, this.ingredients, add(this.instructions, instruction), this.image);
  }

  deleteInstruction(i: number) {
    return new Recipe(this.name, this.ingredients, remove(this.instructions, i), this.image);
  }

  updateInstructions(instructions: string[]) {
    return new Recipe(this.name, this.ingredients, instructions, this.image);
  }

  updateInstruction(i: number, instruction: string) {
    return new Recipe(this.name, this.ingredients, update(this.instructions, i, instruction), this.image);
  }

  updateImage(image: Image) {
    return new Recipe(this.name, this.ingredients, this.instructions, image);
  }

  static fromObj = (defaultImage: Image) => (obj: RecipeJson): Recipe => {
    const name = obj.name;
    const ingredients = _.map(obj.ingredients, ingredient => orAlternativeFromObj(Ingredient.fromObj, ingredient)) || [];
    const instructions = obj.instructions || [];
    const image = obj.image ? Image.fromObj(obj.image) : defaultImage;
    return new Recipe(name, ingredients, instructions, image);
  }
}

export interface RecipeJson {
  name: string;
  ingredients: OrAlternativesJson<IngredientJson>[];
  instructions: string[];
  image: ImageJson;
}

export class Ingredient extends ArgValidator {
  constructor(readonly name: string, readonly quantity: number, readonly units?: string) {
    super([name, quantity]);
  }

  rename(name: string) {
    return new Ingredient(name, this.quantity, this.units);
  }

  updateQuantity(q: number) {
    return new Ingredient(this.name, q, this.units);
  }

  updateUnits(u: string) {
    return new Ingredient(this.name, this.quantity, u);
  }

  static fromObj(obj: IngredientJson): Ingredient {
    const empty = new Ingredient('', 0, '');
    return _.assign(empty, obj);
  }
}

export interface IngredientJson {
  name: string;
  quantity: number;
  units?: string;
}

export class Image extends ArgValidator {
  constructor(readonly url: string, readonly caption: string) {
    super([url, caption]);
  }

  updateUrl(url: string) { return new Image(url, this.caption); }
  updateCaption(caption: string) { return new Image(this.url, caption); }

  static fromObj(obj: ImageJson) {
    return new Image(obj.url, obj.caption);
  }
}

export interface ImageJson {
  url: string;
  caption: string;
}