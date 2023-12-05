import { Injectable } from '@angular/core';
import { Routine, DAYS_OF_WEEK, SelectionMethod } from '../model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  constructor(private readonly recipesService: RecipesService) { }

  getRoutines(): Routine[] {
    return [{
      name: "My week",
      days: [
        {
          name: DAYS_OF_WEEK.MONDAY,
          recipes: this.recipesService.getRecipesByName("Fish Tacos"),
          method: SelectionMethod.RANDOM
        }, {
          name: DAYS_OF_WEEK.TUESDAY,
          recipes: this.recipesService.getRecipesByName("Roast Veg"),
          method: SelectionMethod.RANDOM
        }
      ],
      groups: [
        {
          name: "Breakfasts",
          recipes: [
            ...this.recipesService.getRecipesByName("Fried Egg Breakfast"),
            ...this.recipesService.getRecipesByName("Oatmeal")
          ],
          method: SelectionMethod.RANDOM
        }, {
          name: "Lunches",
          recipes: this.recipesService.getRecipesByName("Sandwiches"),
          method: SelectionMethod.RANDOM
        }
      ]
    }]
  }
}
