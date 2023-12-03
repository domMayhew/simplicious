import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { MatChipEditedEvent } from "@angular/material/chips";
import { Ingredient, Option } from "src/app/model";
import { IngredientComponent } from "./ingredient.component";
import { OrTokenComponent } from "src/app/ui/tokens/or-token/or-token.component";
import { AddAlternativeButton } from "./add-alternative.component";
import { AddIngredientForm } from "./add-ingredient-form.component";
import { Subject } from "rxjs";

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
					<app-add-alternative class="{{showForm ? 'hidden' : ''}}"
						*ngIf="isLast"
						(click)="addAlternativeClicked()">
					</app-add-alternative>
				</app-ingredient>
			</div>
			<app-add-ingredient-form *ngIf="showForm"
				[setFocus]="focusForm.asObservable()"
				(newIngredient)="newIngredient.emit($event)">
			</app-add-ingredient-form>
		</div>
  `,
	styles: [`
		@use '../../../../theme.scss';
		.option-list {
			display: flex;
			flex-flow: column nowrap;
			gap: theme.padding(small);
		}
		app-add-alternative {
			visibility: hidden;
		}
		.option-list:hover app-add-alternative:not(.hidden) {
			visibility: visible;
		}
	`],
	imports: [
		CommonModule,
		IngredientComponent,
		OrTokenComponent,
		AddAlternativeButton,
		AddIngredientForm
	]
})
export class OptionComponent {
	@Input({ required: true }) option!: Option;
	@Input() removedCb: (ingredient: Ingredient) => void = () => { };
	@Input() editedCb: (ingredient: Ingredient, event: MatChipEditedEvent) => void = () => { };
	@Output() newIngredient: EventEmitter<Ingredient> = new EventEmitter();

	showForm = false;
	focusForm: Subject<void> = new Subject();

	constructor(private readonly eRef: ElementRef) { };

	addAlternativeClicked() {
		this.showForm = true;
		// use setTimeout so that the DOM has time to respond to the changed
		// `showForm` value and the form has actually rendered
		setTimeout(() => this.focusForm.next(), 0);
	}

	@HostListener('document:click', ['$event'])
	clickout(event: MouseEvent) {
		this.showForm = this.eRef.nativeElement.contains(event.target);
	}
}
