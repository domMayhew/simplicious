import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatChipEditedEvent, MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Ingredient } from "src/app/model";
import { IngredientQuantityPipe } from "src/app/pipes/ingredient-quantity.pipe";
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-ingredient-chip',
  template: `
    <div class="ingredient-chip-and-button">
			<mat-chip-row [editable]="true"
				[aria-description]="'press enter to edit ' + ingredient.name"
				[matTooltipPosition]="'below'"
				[matTooltipShowDelay]="250"
				[matTooltip]="ingredient | ingredientQuantity"
				(removed)="removedCb(ingredient)"
				(edited)="editedCb(ingredient, $event)">
				{{ingredient.name}}
				<button [attr.aria-label]="'remove ' + ingredient.name"
					matChipRemove>
					<mat-icon>cancel</mat-icon>
				</button>
			</mat-chip-row>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ingredient-chip.component.scss'],
  imports: [
    CommonModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule,
    IngredientQuantityPipe,
  ]
})
export class IngredientChipComponent {
  @Input({ required: true }) ingredient!: Ingredient;
  @Input() removedCb: (ingredient: Ingredient) => void = () => { };
  @Input() editedCb: (ingredient: Ingredient, event: MatChipEditedEvent) => void = () => { };
}
