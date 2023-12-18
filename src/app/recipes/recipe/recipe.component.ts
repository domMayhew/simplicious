import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Input() editing = false;
  @Output() updateRecipe = new EventEmitter<Recipe>();

  constructor(private readonly ref: ElementRef) { };

  scrollIntoView() {
    this.ref.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
