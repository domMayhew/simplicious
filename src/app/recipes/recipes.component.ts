import { Component } from '@angular/core';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [CommonModule, WithNavComponent, RecipeComponent, MatButtonModule]
})
export class RecipesComponent {

}
