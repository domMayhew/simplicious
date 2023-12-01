import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Recipe } from '../../model';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';

@Component({
  standalone: true,
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [IngredientListComponent, CommonModule, MatCardModule, MatTooltipModule]
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
}
