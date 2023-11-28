import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ingredient-token',
  templateUrl: './ingredient-token.component.html',
  styleUrls: ['./ingredient-token.component.scss']
})
export class IngredientTokenComponent {
  @Input({ required: true }) content!: string;
}
