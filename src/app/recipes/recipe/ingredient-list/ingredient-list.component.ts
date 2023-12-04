import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipEditedEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { Ingredient, Option, Requirement } from 'src/app/model';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { IngredientQuantityPipe } from 'src/app/pipes/ingredient-quantity.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { OrTokenComponent } from 'src/app/ui/tokens/or-token/or-token.component';
import { IngredientComponent } from './ingredient.component';
import { OptionComponent } from './option.component';
import { AddAlternativeButton } from './add-alternative.component';
import { AddIngredientForm } from './add-ingredient-form.component';
import { Observable, Subject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    IngredientQuantityPipe,
    OrTokenComponent,
    IngredientComponent,
    OptionComponent,
    AddAlternativeButton,
    AddIngredientForm
  ],
  providers: [FormBuilder]
})
export class IngredientListComponent {
  @Input({ required: true }) requirements: Requirement[] = [];

  constructor(private formBuilder: FormBuilder) { };

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly addOnBlur = true;
  private readonly numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const matches = /^(\d+|(\d*\.\d+))$/.test(control.value);
    return matches ? null : { invalidNumber: control.value + "is not a number" };
  }

  editing = false;
  focusedOptionIndex: number = -1;
  focusedOptionIndexSub$: Subject<number> = new Subject();
  focusedOptionIndexObs$: Observable<number> = this.focusedOptionIndexSub$.asObservable();
  focusForm: Subject<void> = new Subject();

  form = this.formBuilder.group({
    quantity: ['1', this.numberValidator],
    units: [''],
    name: ['', Validators.required],
  });

  setEditing(value: boolean) {
    this.editing = value;
  }

  remove = (option?: Option) => (ingredient: Ingredient): void => {
    const list = option ? option.options : this.requirements;
    const index = list.indexOf(ingredient);
    if (index >= 0) {
      list.splice(index, 1);
    }
  }

  edit = (option?: Option) => (ingredient: Ingredient, event: MatChipEditedEvent): void => {
    const list = option ? option.options : this.requirements;
    const newIngredient = Object.assign({}, ingredient, { name: event.value });
    const index = list.indexOf(ingredient);
    if (index >= 0) {
      list.splice(index, 1, newIngredient);
    }
  }

  add = (option?: Option) => (ingredient: Ingredient): void => {
    const list = option ? option.options : this.requirements;
    list.push(ingredient);
  }

  convertToOption = (ingredient: Ingredient): void => {
    const index = this.requirements.indexOf(ingredient);
    if (index >= 0) {
      const option = {
        options: [ingredient]
      }
      this.requirements.splice(index, 1, option);
      this.focusedOptionIndexSub$.next(index);
      this.focusedOptionIndex = index;
    }
  }

  revertToIngredient = (option: Option): void => {
    const index = this.requirements.indexOf(option);
    if (index >= 0 && option.options.length === 1) {
      const ingredient = option.options[0];
      this.requirements.splice(index, 1, ingredient);
    }
  }

  deleteOption = (option: Option): void => {
    const index = this.requirements.indexOf(option);
    if (index >= 0) {
      this.requirements.splice(index, 1);
    }
  }

  isIngredient(req: Requirement): req is Ingredient {
    const ingredient = req as Ingredient;
    return ingredient.name !== undefined && ingredient.quantity !== undefined;
  }

  isOption(req: Requirement): req is Option {
    const op = req as Option;
    return op.options !== undefined;
  }
}
