import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Recipe } from '../../model';
import { IngredientChipListComponent } from './ingredient-chip-list/ingredient-chip-list.component';

@Component({
  standalone: true,
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    IngredientChipListComponent
  ]
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
}
