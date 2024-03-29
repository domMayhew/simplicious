import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Ingredient } from "src/app/model/recipe.model";
import { IngredientComponent } from "./ingredient/ingredient.component";
import { OrTokenComponent } from "src/app/ui/or-token/or-token.component";
import { AddAlternativeButton } from "../../../ui/add-alternative.component";
import { AddIngredientForm } from "./new-ingredient-form/add-ingredient-form.component";
import { Observable, Subject } from "rxjs";
import { Alternatives } from "src/app/model/common.model";

@Component({
	standalone: true,
	selector: 'app-ingredient-alternatives',
	template: `
		<h4 *ngIf="!editing"
			class="body-1 group-name">
			{{alternativesGroup.name || 'Untitled option'}}
		</h4>
		<input #name *ngIf="editing"
			class="body-1 group-name"
			type="text"
			value="{{alternativesGroup.name || 'Untitled option'}}"
			(blur)="rename(name.value)">
		<ng-container *ngFor="
			let ingredient of alternativesGroup.alternatives;
			index as i; last as isLast">
			<app-ingredient [ingredient]="ingredient"
				(delete)="deleteIngredient(i)"
				(update)="updateIngredient(i)($event)"
				[editing]="editing">
				<app-or-token *ngIf="!isLast"></app-or-token>
				<app-add-alternative class="{{showForm ? 'hidden' : ''}}"
					*ngIf="isLast && editing"
					(click)="addAlternativeClicked()">
				</app-add-alternative>
			</app-ingredient>
		</ng-container>
		<app-add-ingredient-form *ngIf="editing && showForm"
			(newIngredient)="addIngredient($event)"
			(close)="closeForm()"
			[inOption]="true">
		</app-add-ingredient-form>
  `,
	styleUrls: ['./ingredient-alternatives.component.scss'],
	imports: [
		CommonModule,
		IngredientComponent,
		OrTokenComponent,
		AddAlternativeButton,
		AddIngredientForm
	]
})
export class IngredientAlternativesComponent {
	@Input({ required: true }) alternativesGroup!: Alternatives<Ingredient>;
	@Input() editing = false;
	@Input() closeForm$!: Observable<void>;
	@Output() delete = new EventEmitter<void>();
	@Output() update = new EventEmitter<Alternatives<Ingredient>>();
	@Output() revertToIngredient: EventEmitter<void> = new EventEmitter();

	showForm = true;
	focusForm: Subject<void> = new Subject();

	ngOnInit() {
		this.closeForm$.subscribe(() => {
			this.closeForm();
		});
	}

	addAlternativeClicked = () => {
		this.showForm = true;
		// use setTimeout so that the DOM has time to respond to the changed
		// `showForm` value and the form has actually rendered
		setTimeout(() => this.focusForm.next(), 0);
	}

	rename = (newName: string) => {
		this.update.emit(this.alternativesGroup.rename(newName));
	}

	addIngredient = (ingredient: Ingredient) => {
		this.update.emit(this.alternativesGroup.addAlternative(ingredient));
	}

	deleteIngredient = (i: number) => {
		this.update.emit(this.alternativesGroup.deleteAlternative(i));
	}

	updateIngredient = (i: number) => (ingredient: Ingredient) => {
		this.update.emit(this.alternativesGroup.updateAlternative(i, ingredient));
	}

	closeForm = () => {
		this.showForm = false;
		if (this.alternativesGroup.alternatives.length === 1) {
			this.revertToIngredient.emit();
		} else if (this.alternativesGroup.alternatives.length === 0) {
			this.delete.emit();
		}
	}
}
