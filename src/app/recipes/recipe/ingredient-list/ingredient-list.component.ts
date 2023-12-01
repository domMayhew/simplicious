import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IngredientSelection } from 'src/app/model';
import { IngredientQuantityPipe } from 'src/app/pipes/ingredient-quantity.pipe';
import { IngredientTokenComponent } from 'src/app/ui/tokens/ingredient-token/ingredient-token.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  imports: [IngredientQuantityPipe, CommonModule, IngredientTokenComponent, MatTooltipModule]
})
export class IngredientListComponent {
  @Input({ required: true }) items!: IngredientSelection[];
}
