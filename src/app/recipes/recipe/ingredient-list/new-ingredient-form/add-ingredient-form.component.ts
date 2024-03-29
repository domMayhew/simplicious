import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Ingredient } from "src/app/model/recipe.model";

@Component({
  standalone: true,
  selector: 'app-add-ingredient-form',
  templateUrl: './add-ingredient-form.component.html',
  styleUrls: ['./add-ingredient-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddIngredientForm {
  @Input() inOption = false;
  @Output() newIngredient: EventEmitter<Ingredient> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @ViewChild('quantity') quantityRef!: ElementRef<HTMLInputElement>;

  constructor(private readonly formBuilder: FormBuilder) { };

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

  onSubmit() {
    // Re-validate controls since on last submit errors were set to `null`
    Object.values(this.form.controls).forEach((c: AbstractControl) => c.updateValueAndValidity());
    if (this.form.valid) {
      const ingredient = new Ingredient(
        this.form.value.name || '',
        Number.parseFloat(this.form.value.quantity || '') || 1,
        this.form.value.units || ''
      );
      this.newIngredient.emit(ingredient);
      this.form.reset();
      this.form.controls.quantity.setValue('1');
      this.quantityRef.nativeElement.focus();

      Object.values(this.form.controls).forEach(control => {
        control.setErrors(null);
      });
    }
  }
}