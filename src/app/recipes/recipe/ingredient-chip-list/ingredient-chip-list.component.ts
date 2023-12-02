import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipEditedEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { Ingredient, Option, Requirement } from 'src/app/model';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { IngredientQuantityPipe } from 'src/app/pipes/ingredient-quantity.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { OrTokenComponent } from 'src/app/ui/tokens/or-token/or-token.component';
import { IngredientChipComponent } from './ingredient-chip.component';
import { OptionChipListComponent } from './option-chip-list.component';

@Component({
  standalone: true,
  selector: 'app-ingredient-chip-list',
  templateUrl: './ingredient-chip-list.component.html',
  styleUrls: ['./ingredient-chip-list.component.scss'],
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
    IngredientChipComponent,
    OptionChipListComponent
  ],
  providers: [FormBuilder]
})
export class IngredientChipListComponent {
  @Input({ required: true }) requirements: Requirement[] = [];

  constructor(private formBuilder: FormBuilder) { };

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly addOnBlur = true;
  private readonly numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const matches = /^(\d+|(\d*\.\d+))$/.test(control.value);
    return matches ? null : { invalidNumber: control.value + "is not a number" };
  }

  form = this.formBuilder.group({
    quantity: ['1', this.numberValidator],
    units: [''],
    name: ['', Validators.required],
  });

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

  add = (option?: Option) => (form: FormGroup): void => {
    if (form.valid) {
      const newIngredient: Ingredient = {
        name: this.form.value.name || '',
        units: this.form.value.units || '',
        quantity: Number.parseFloat(this.form.value.quantity || '') || 1
      }
      const list = option ? option.options : this.requirements;
      list.push(newIngredient);
      form.reset();
      Object.values(form.controls).forEach(control => control.setErrors(null));
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
