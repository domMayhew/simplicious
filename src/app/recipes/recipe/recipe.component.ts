import { CommonModule } from '@angular/common';
import { Component, DoCheck, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Recipe } from '../../model';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditButtonComponent } from 'src/app/ui/edit-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RecipeInstructionsComponent } from './recipe-instructions/recipe-instructions.component';
import { MenuItem, SettingsButtonComponent } from 'src/app/ui/settings-button.component';

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
    EditButtonComponent,
    RecipeInstructionsComponent,
    SettingsButtonComponent
  ]
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Output() deleteRecipe: EventEmitter<void> = new EventEmitter();

  constructor(private readonly ref: ElementRef<HTMLElement>) { }

  editing = false;
  settingsMenuItems: MenuItem[] = [
    { name: menuItemNames.EDIT, icon: "edit" },
    { name: menuItemNames.DELETE, icon: "delete", color: "warn" }
  ]

  menuItemSelected(item: MenuItem) {
    switch (item.name) {
      case menuItemNames.EDIT:
        this.setEditing(true);
        break;
      case menuItemNames.DELETE:
        this.deleteRecipe.emit();
        break;
    }
  }

  setEditing(value: boolean) {
    this.editing = value;
  }

  titleChange(title: string) {
    const trimmed = title.trim();
    const firstNewline = title.indexOf("\n");
    const firstLine = firstNewline === -1 ? trimmed : trimmed.substring(0, firstNewline);
    this.recipe.title = firstLine || 'Untitle Recipe';
  }

  updateInstructions(instructions: string[]) {
    this.recipe.instructions = instructions;
  }

  deleteInstruction(instruction: string) {
    const index = (this.recipe.instructions || []).indexOf(instruction);
    if (index >= 0) {
      this.recipe.instructions?.splice(index, 1);
    }
  }

  scrollIntoView() {
    this.ref.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}

enum menuItemNames {
  EDIT = "Edit",
  DELETE = "Delete"
};
