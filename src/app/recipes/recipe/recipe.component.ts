import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeModalComponent } from './recipe-modal/recipe-modal.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  providers: [MatDialog],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Input({ required: true }) index!: number;
  @Input() editing = false;
  @Output() updateRecipe = new EventEmitter<Recipe>();


  constructor(private readonly ref: ElementRef, public dialog: MatDialog) { };

  openDialog(): void {
    const enterAnimationDuration: string = '100ms';
    const exitAnimationDuration: string = '100ms';

    this.dialog.open(RecipeModalComponent, {
      data: { recipe: this.recipe, index: this.index },
      enterAnimationDuration,
      exitAnimationDuration,
      width: '100%',
      height: '90vh'
    });
  }

  scrollIntoView() {
    this.ref.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
