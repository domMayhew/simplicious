import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Recipe } from '../../model';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditButtonComponent } from 'src/app/ui/edit-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    IngredientListComponent,
    EditButtonComponent
  ]
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;

  editingInstructions = false;

  constructor(private readonly formBuilder: FormBuilder) { };

  newInstructionForm = this.formBuilder.group({
    instruction: ['', Validators.required]
  });

  setEditingInstructions(value: boolean) {
    this.editingInstructions = value;
  }

  titleChange(title: string) {
    this.recipe.title = title;
  }

  addInstruction() {
    Object.values(this.newInstructionForm.controls).forEach(control => {
      control.updateValueAndValidity();
    })
    if (this.newInstructionForm.valid) {
      const instruction = this.newInstructionForm.controls.instruction.value || '';
      this.recipe.instructions = this.recipe.instructions || [];
      this.recipe.instructions.push(instruction);
      this.newInstructionForm.reset();
      Object.values(this.newInstructionForm.controls).forEach(control => control.setErrors(null));
    }
  }

  editInstruction(original: string, newVal: string) {
    const index = (this.recipe.instructions || []).indexOf(original);
    if (index >= 0) {
      this.recipe.instructions?.splice(index, 1, newVal.trim());
    }
  }

  deleteInstruction(instruction: string) {
    const index = (this.recipe.instructions || []).indexOf(instruction);
    if (index >= 0) {
      this.recipe.instructions?.splice(index, 1);
    }
  }
}
