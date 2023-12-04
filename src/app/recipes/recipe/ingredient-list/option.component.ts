import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { MatChipEditedEvent } from "@angular/material/chips";
import { Ingredient, Option } from "src/app/model";
import { IngredientComponent } from "./ingredient.component";
import { OrTokenComponent } from "src/app/ui/tokens/or-token/or-token.component";
import { AddAlternativeButton } from "./add-alternative.component";
import { AddIngredientForm } from "./add-ingredient-form.component";
import { Observable, Subject } from "rxjs";

@Component({
	standalone: true,
	selector: 'app-option',
	template: `
		<div class="option-list">
			<h4 *ngIf="!editing"
				class="body-1 option-name">
				{{option.name || 'Untitled option'}}
			</h4>
			<input #name *ngIf="editing"
				class="body-1 option-name"
				type="text"
				value="{{option.name || 'Untitled option'}}"
				(blur)="editName(name.value)">
			<div *ngFor="let ingredient of option.options; last as isLast"
				class="chip-and-or-token">
				<app-ingredient [ingredient]="ingredient"
					[removedCb]="removed"
					[editedCb]="editedCb"
					[editing]="editing">
					<app-or-token *ngIf="!isLast"></app-or-token>
					<app-add-alternative class="{{showForm ? 'hidden' : ''}}"
						*ngIf="isLast && editing"
						(click)="addAlternativeClicked()">
					</app-add-alternative>
				</app-ingredient>
			</div>
			<app-add-ingredient-form *ngIf="editing && showForm"
				(newIngredient)="newIngredient.emit($event)"
				(close)="closeForm()"
				[inOption]="true">
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

		.option-name {
			font-weight: 600;
			font-style: italic;
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
	@Input({ required: true }) removedCb: (ingredient: Ingredient) => void = () => { };
	@Input({ required: true }) editedCb: (ingredient: Ingredient, event: MatChipEditedEvent) => void = () => { };
	@Input() editing = false;
	@Input() closeForm$!: Observable<void>;
	@Output() newIngredient: EventEmitter<Ingredient> = new EventEmitter();
	@Output() revertToIngredient: EventEmitter<void> = new EventEmitter();
	@Output() deleteOption: EventEmitter<void> = new EventEmitter();
	@Output('editName') editNameEvent: EventEmitter<string> = new EventEmitter();

	showForm = true;
	focusForm: Subject<void> = new Subject();

	ngOnInit() {
		this.closeForm$.subscribe(() => {
			console.log("Closed FORM");
			this.closeForm();
		});
	}

	addAlternativeClicked() {
		this.showForm = true;
		// use setTimeout so that the DOM has time to respond to the changed
		// `showForm` value and the form has actually rendered
		setTimeout(() => this.focusForm.next(), 0);
	}

	editName(newName: string) {
		this.editNameEvent.emit(newName);
	}

	removed = (ingredient: Ingredient) => {
		if (this.option.options.length === 1 && !this.showForm) {
			this.deleteOption.emit();
		} else if (this.option.options.length === 2 && !this.showForm) {
			this.removedCb(ingredient);
			this.revertToIngredient.emit();
		} else {
			this.removedCb(ingredient);
		}
	}

	closeForm = () => {
		this.showForm = false;
		if (this.option.options.length === 1) {
			this.revertToIngredient.emit();
		} else if (this.option.options.length === 0) {
			this.deleteOption.emit();
		}
	}
}
