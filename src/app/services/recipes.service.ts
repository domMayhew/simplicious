import { Injectable } from '@angular/core';
import { Recipe } from '../model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  fishTacos: Recipe = {
    title: 'Fish Tacos',
    requirements: [
      { name: 'corn tortillas', quantity: 10 },
      {
        options: [
          { name: 'frozen cod fillets', quantity: 4 },
          { name: 'frozen tilapia fillets', quantity: 4 },
          { name: 'frozen swai fillets', quantity: 4 }
        ],
        name: "Frozen Fish"
      },
      { name: 'coleslaw', quantity: 1, units: 'bag' },
      { name: 'taco seasoning', quantity: 2, units: 'tablespoons' },
      { name: 'lemonjuice', quantity: 2, units: 'tablespoons' },
      { name: 'chipotle mayonnaise is a long name', quantity: 4, units: 'tablespoons' }
    ],
    instructions: ['Cover the fish fillets in taco seasoning.',
      'Cook the fish fillets in an air fryer until they flake when scraped with a fork, usually 10-12 minutes.',
      'Heat the corn tortillas in an oven or frying pan.',
      'Put it all together!'],
    image: {
      url: '/assets/images/stir-fry.webp',
      caption: 'https://downshiftology.com/recipes/chicken-stir-fry/'
    }
  }

  roastVeg: Recipe = {
    title: "Roast Veg",
    requirements: [
      { name: 'rice', quantity: 1, units: "cups" },
      { name: 'bell peppers', quantity: 2 },
      { name: 'broccoli', quantity: 2, units: 'heads' },
      { name: 'mushrooms', quantity: 0.5, units: 'packs' },
      { name: 'carrots', quantity: 5 },
      {
        name: "Meat",
        options: [
          { name: 'chicken breasts', quantity: 4 },
          { name: 'ground beef', quantity: 500, units: 'grams' },
          { name: 'pork chops', quantity: 4 }
        ]
      },
      {
        name: "Starch",
        options: [
          { name: 'sweet potatoes', quantity: 4 },
          { name: 'russet potatoes', quantity: 4 }
        ]
      }
    ]
  }

  friedEggBreakfast: Recipe = {
    title: "Fried Egg Breakfast",
    requirements: [
      { name: 'eggs', quantity: 4 },
      { name: 'bread', quantity: 4, units: 'slices' },
      { name: 'avocado', quantity: 1 }
    ]
  }

  oatmeal: Recipe = {
    title: "Oatmeal",
    requirements: [
      { name: 'oats', quantity: 1.5, units: "cups" },
      { name: 'mixed nuts', quantity: 0.5, units: "cups" },
      { name: 'peanut butter', quantity: 0.25, units: "cups" },
      { name: 'soy milk', quantity: 0.5, units: "cups" },
      { name: 'frozen berries', quantity: 0.5, units: "cups" }
    ]
  }

  sandwiches: Recipe = {
    title: 'Sandwiches',
    requirements: [
      { name: 'bread', quantity: 4, units: 'slices' },
      { name: 'cheese', quantity: 0.25, units: 'blocks' },
      { name: 'tomatoes', quantity: 0.5 },
      { name: 'lettuce', quantity: 0.5, units: 'heads' }
    ]
  }

  recipes: Recipe[] = [this.fishTacos, this.roastVeg, this.friedEggBreakfast, this.oatmeal, this.sandwiches];

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipesByName(title: string): Recipe[] {
    return this.recipes.filter(r => r.title === title);
  }

  defaultImage(): [string, string] {
    return ['/assets/images/dinner-plate.jpg', 'https://www.cb2.ca/frank-white-dinner-plate/s153072']
  }
}
