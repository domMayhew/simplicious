import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatChipEditedEvent, MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Ingredient } from "src/app/model/recipe.model";
import { IngredientQuantityPipe } from "src/app/pipes/ingredient-quantity.pipe";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-ingredient',
  template: `
    <div class="ingredient-and-button">
			<mat-chip-row [editable]="editing"
				[aria-description]="'press enter to edit ' + ingredient.name"
				[matTooltipPosition]="'below'"
				[matTooltipShowDelay]="250"
				[matTooltip]="ingredient | ingredientQuantity"
				(removed)="delete.emit()"
				(edited)="updateName($event)">
				{{ingredient.name}}
				<button *ngIf="editing"
          [attr.aria-label]="'remove ' + ingredient.name"
					matChipRemove>
					<mat-icon>cancel</mat-icon>
				</button>
			</mat-chip-row>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ingredient.component.scss'],
  imports: [
    CommonModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule,
    IngredientQuantityPipe,
  ]
})
export class IngredientComponent {
  @Input({ required: true }) ingredient!: Ingredient;
  @Input() editing = false;
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() update: EventEmitter<Ingredient> = new EventEmitter();

  updateName(event: MatChipEditedEvent) {
    this.update.emit(this.ingredient.rename(event.value));
  }
}
