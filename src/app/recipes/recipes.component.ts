import { Component } from '@angular/core';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
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
  fishTacos: Recipe = {
    title: 'Fish Tacos',
    items: [
      { options: [{ name: 'corn tortillas', quantity: 10 }] },
      {
        options: [
          { name: 'frozen cod fillets', quantity: 4 },
          { name: 'frozen tilapia fillets', quantity: 4 },
          { name: 'frozen swai fillets', quantity: 4 }
        ]
      }
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
}
