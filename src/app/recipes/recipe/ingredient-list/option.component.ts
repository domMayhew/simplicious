import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatChipEditedEvent } from "@angular/material/chips";
import { Ingredient, Option } from "src/app/model";
import { IngredientComponent } from "./ingredient.component";
import { OrTokenComponent } from "src/app/ui/tokens/or-token/or-token.component";
import { AddAlternativeButton } from "./add-alternative.component";

@Component({
	standalone: true,
	selector: 'app-option',
	template: `
		<div class="option-list">
			<div *ngFor="let ingredient of option.options; last as isLast"
				class="chip-and-or-token">
				<app-ingredient [ingredient]="ingredient"
					[removedCb]="removedCb"
					[editedCb]="editedCb">
					<app-or-token *ngIf="!isLast"></app-or-token>
					<app-add-alternative *ngIf="isLast"></app-add-alternative>
				</app-ingredient>
			</div>
		</div>
  `,
	styles: [`
		app-add-alternative {
			visibility: hidden;
		}
		.option-list:hover app-add-alternative {
			visibility: visible;
		}
	`],
	imports: [
		CommonModule,
		IngredientComponent,
		OrTokenComponent,
		AddAlternativeButton
	]
})
export class OptionComponent {
	@Input({ required: true }) option!: Option;
	@Input() removedCb: (ingredient: Ingredient) => void = () => { };
	@Input() editedCb: (ingredient: Ingredient, event: MatChipEditedEvent) => void = () => { };
}
