import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Ingredient } from 'src/app/model/recipe.model';
import { Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Alternatives, OrAlternatives } from 'src/app/model/common.model';
import { ArrayService } from 'src/app/services/array.service';
import { isAlternatives, isSingleElement } from '../../../model/common.model';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AddAlternativeButton } from 'src/app/ui/add-alternative.component';
import { IngredientAlternativesComponent } from './ingredient-alternatives.component';
import { AddIngredientForm } from './new-ingredient-form/add-ingredient-form.component';

@Component({
  standalone: true,
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  imports: [
    CommonModule,
    IngredientComponent,
    AddAlternativeButton,
    IngredientAlternativesComponent,
    AddIngredientForm
  ],
  providers: [FormBuilder]
})
export class IngredientListComponent {
  @Input({ required: true }) ingredients: OrAlternatives<Ingredient>[] = [];
  @Input() editing = false;
  @Output() updateIngredients: EventEmitter<OrAlternatives<Ingredient>[]> = new EventEmitter();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly addOnBlur = true;
  private readonly numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const matches = /^(\d+|(\d*\.\d+))$/.test(control.value);
    return matches ? null : { invalidNumber: control.value + "is not a number" };
  }

  closeForms$: Subject<void> = new Subject();

  form = this.formBuilder.group({
    quantity: ['1', this.numberValidator],
    units: [''],
    name: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly arrayService: ArrayService) { };

  ngAfterViewInit() {
    this.closeForms$.next();
  }

  deleteIngredient = (i: number): void => {
    this.updateIngredients.emit(
      this.arrayService.remove(this.ingredients, i)
    );
  }

  updateIngredient = (i: number) => (ingredient: OrAlternatives<Ingredient>) => {
    this.updateIngredients.emit(
      this.arrayService.update(this.ingredients, i, ingredient)
    );
  }

  addIngredient = (ingredient: OrAlternatives<Ingredient>) => {
    this.updateIngredients.emit(
      this.arrayService.add(this.ingredients, ingredient)
    );
  }

  convertToAlternatives = (i: number) => {
    const ingredient = this.ingredients[i];
    if (this.isIngredient(ingredient)) {
      this.updateIngredients.emit(
        this.arrayService.update(
          this.ingredients,
          i,
          new Alternatives('Untitled Ingredient', [ingredient]))
      )
    } else {
      console.warn(
        "Cannot convert to alternatives because it is already an alternatives group",
        ingredient);
    }
  }

  revertToIngredient(i: number) {
    const group = this.ingredients[i];
    if (isAlternatives(group)) {
      if (group.alternatives.length === 1) {
        this.updateIngredient(i)(group.alternatives[0]);
      } else {
        console.error(
          "Reverted an alternative group to ingredient but it had more than one element.",
          group.alternatives
        );
      }
    } else {
      console.error(
        "Cannot revert to ingredient because it is not an alternatives group.",
        group
      );
    }
  }

  isAlternatives = isAlternatives;
  isIngredient = isSingleElement;
}
