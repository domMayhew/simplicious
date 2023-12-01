import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, ControlContainer, FormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { Ingredient, IngredientSelection } from 'src/app/model';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IngredientQuantityPipe } from 'src/app/pipes/ingredient-quantity.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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
    IngredientQuantityPipe
  ],
  providers: [FormBuilder]
})
export class IngredientChipListComponent {
  @Input({ required: true }) items: IngredientSelection[] = [];

  constructor(private formBuilder: FormBuilder) { };

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly addOnBlur = true;
  private readonly numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const matches = /^(\d+|(\d*\.\d+))$/.test(control.value);
    return matches ? null : { invalidNumber: control.value + "is not a number" };
  }

  hovered: IngredientSelection | undefined;

  form = this.formBuilder.group({
    quantity: ['1', this.numberValidator],
    units: [''],
    name: ['', Validators.required],
  });

  remove(selection: IngredientSelection): void {
    const index = this.items.indexOf(selection);
    if (index > 0) {
      this.items.splice(index, 1);
    }
  }

  edit(selection: IngredientSelection, event: MatChipEditedEvent): void {
    const ingredient = selection.options[0];
    const newIngredient = Object.assign({}, ingredient, { name: event.value });
    const newSelection = Object.assign({}, selection, { options: [newIngredient] })
    const index = this.items.indexOf(selection);
    if (index > 0) {
      this.items.splice(index, 1, newSelection);
    }
  }

  add() {
    if (this.form.valid) {
      const newIngredient: Ingredient = {
        name: this.form.value.name || '',
        units: this.form.value.units || '',
        quantity: Number.parseFloat(this.form.value.quantity || '') || 1
      }
      this.items.push({ options: [newIngredient] });
      this.form.reset();
      this.form.controls.name.setErrors(null);
      this.form.controls.quantity.setErrors(null);
      this.form.controls.units.setErrors(null);
    }
  }

  onHover(item?: IngredientSelection) {
    this.hovered = item;
  }
}
