import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from 'src/app/ui/card.component';
import { MenuItem, MenuItemName, SettingsButtonComponent } from 'src/app/ui/settings-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RoutineRecipeComponent } from '../routine-recipe/routine-recipe.component';
import { OrTokenComponent } from 'src/app/ui/or-token/or-token.component';
import { MatIconModule } from '@angular/material/icon';
import { Habit } from 'src/app/model/routine.model';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Alternatives, OrAlternatives, isAlternatives, isSingleElement } from 'src/app/model/common.model';
import * as _ from 'lodash';
import { RecipeTokenComponent } from 'src/app/recipes/recipe-token/recipe-token.component';
import { AddAlternativeButton } from 'src/app/ui/add-alternative.component';
import { UUID } from 'src/app/model/user.model';
import { ArrayService } from 'src/app/services/array.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CardComponent,
    SettingsButtonComponent,
    RoutineRecipeComponent,
    OrTokenComponent,
    RecipeTokenComponent,
    AddAlternativeButton,
    MatMenuModule,
  ],
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent {
  @Input({ required: true }) habit!: Habit;
  @Input() editing = false;
  @Output() update: EventEmitter<Habit> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();

  // TODO: This component should not actually house all the recipes in memory
  // Instead, a list of names should be retrieved
  allRecipes$: Observable<Recipe[]>;
  updatingRecipe: [number, number | undefined] | undefined;

  constructor(private readonly recipeService: RecipeService,
    private readonly arrayService: ArrayService,
    private readonly ref: ElementRef<HTMLElement>) {
    this.allRecipes$ = recipeService.currentUserRecipes();
  }

  setEditing(value: boolean) {
    this.editing = value;
  }

  rename(name: string) {
    this.update.emit(this.habit.rename(name));
  }

  menuItemSelected(item: MenuItem) {
    switch (item.name) {
      case MenuItemName.EDIT:
        this.setEditing(true);
        break;
      case MenuItemName.DELETE:
        this.delete.emit();
        break;
    }
  }

  addRecipe() {
    this.getRandomRecipe().subscribe(recipe => {
      this.update.emit(
        this.habit.addRecipe(recipe)
      )
    });
  }

  updateRecipe(i: number, recipe: Recipe) {
    this.update.emit(
      this.habit.updateOrAlternatives(i, recipe)
    );
  }

  deleteRow = (i: number) => {
    this.update.emit(
      this.habit.deleteOrAlternatives(i)
    );
  }

  deleteRecipeFromGroup = (groupIndex: number) => (alternativeIndex: number) => {
    const group = this.habit.recipes[groupIndex];
    if (isAlternatives(group)) {
      const newGroup = group.deleteAlternative(alternativeIndex);
      const newHabit = this.habit.updateOrAlternatives(groupIndex, newGroup);
      this.update.emit(newHabit);
    }
  }

  addAlternative(rowIndex: number) {
    const recipeOrGroup: OrAlternatives<Recipe> = this.habit.recipes[rowIndex];
    if (isAlternatives(recipeOrGroup)) {
      this.getRandomRecipe().subscribe(recipe => {
        this.update.emit(
          this.habit.updateOrAlternatives(rowIndex, recipeOrGroup.addAlternative(recipe))
        )
      });
    } else {
      this.getRandomRecipe().subscribe(recipe => {
        const id = UUID.randomUUID();
        this.update.emit(
          this.habit.updateOrAlternatives(
            rowIndex,
            new Alternatives<Recipe>("Untitled", [recipeOrGroup, recipe])
          )
        )
      });
    }
  }

  menuToggled = (groupIndex: number) => (alternativeIndex?: number) => (isOpen: boolean) => {
    const nextVal: [number, number | undefined] | undefined = isOpen ? [groupIndex, alternativeIndex] : undefined;
    this.updatingRecipe = nextVal;
  }

  recipeSelected = (id: UUID) => {
    const recipe$ = this.recipeService.getRecipeById(id);
    recipe$.subscribe(recipe => {
      if (this.updatingRecipe && recipe) {
        const [groupIndex, alternativeIndex] = this.updatingRecipe;
        if (alternativeIndex) {
          const group = this.habit.recipes[groupIndex] as Alternatives<Recipe>;
          const newGroup = group.updateAlternative(alternativeIndex, recipe);
          const newHabit = this.habit.updateOrAlternatives(groupIndex, newGroup);
          this.update.emit(newHabit);
        } else {
          const newHabit = this.habit.updateOrAlternatives(groupIndex, recipe);
          this.update.emit(newHabit);
        }
      }
    })
  }

  private getRandomRecipe(): Observable<Recipe> {
    return this.allRecipes$.pipe(
      map((recipes: Recipe[]) => recipes[0])
    );
  }

  scrollIntoView() {
    this.ref.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  min = Math.min;
  isAlternatives = isAlternatives;
  isSingleElement = isSingleElement;
}
