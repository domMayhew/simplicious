import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { EditButtonComponent } from "src/app/ui/edit-button.component";

@Component({
  standalone: true,
  selector: 'app-recipe-instructions',
  templateUrl: './recipe-instructions.component.html',
  styleUrls: ['./recipe-instructions.component.scss'],
  imports: [
    CommonModule,
    EditButtonComponent,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class RecipeInstructionsComponent {
  @Input({ required: true }) instructions!: string[];
  @Input() editing = false;
  @Output() updateInstructions: EventEmitter<string[]> = new EventEmitter();

  constructor(private readonly formBuilder: FormBuilder) { }

  newInstructionForm = this.formBuilder.group({
    instruction: ['', Validators.required]
  });

  addInstruction() {
    Object.values(this.newInstructionForm.controls).forEach(control => {
      control.updateValueAndValidity();
    })
    if (this.newInstructionForm.valid) {
      const instruction = this.newInstructionForm.controls.instruction.value || '';
      this.instructions = this.instructions || [];
      this.instructions.push(instruction);
      this.newInstructionForm.reset();
      Object.values(this.newInstructionForm.controls).forEach(control => control.setErrors(null));
    }
    this.updateInstructions.emit(this.instructions);
  }

  editInstruction(index: number, newVal: string) {
    this.instructions.splice(index, 1, newVal);
    this.updateInstructions.emit(this.instructions);
  }

  deleteInstruction(index: number) {
    this.instructions.splice(index, 1);
    this.updateInstructions.emit(this.instructions);
  }
}