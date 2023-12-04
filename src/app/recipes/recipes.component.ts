import { Component, ElementRef, ViewChild } from '@angular/core';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { Recipe } from '../model';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [CommonModule, WithNavComponent, RecipeComponent, MatButtonModule]
})
export class RecipesComponent {
  @ViewChild(RecipeComponent) firstRecipe: RecipeComponent | undefined;

  constructor(private readonly viewPortScroller: ViewportScroller) { }

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

  recipes: Recipe[] = [this.fishTacos, this.fishTacos, this.fishTacos, this.fishTacos, this.fishTacos];

  newRecipe() {
    this.recipes.unshift({
      title: 'No title',
      requirements: []
    });

    setTimeout(() => {
      console.log(this.firstRecipe);
      this.firstRecipe?.scrollIntoView();
      if (this.firstRecipe) {
        this.firstRecipe.editing = true;
      }
    }, 0);
  }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.indexOf(recipe);
    if (index >= 0) {
      this.recipes.splice(index, 1);
    }
  }
}
