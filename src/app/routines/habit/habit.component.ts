import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from 'src/app/ui/card.component';
import { MenuItem, MenuItemNames, SettingsButtonComponent } from 'src/app/ui/settings-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RoutineRecipeComponent } from '../routine-recipe/routine-recipe.component';
import { OrTokenComponent } from 'src/app/ui/or-token/or-token.component';
import { MatIconModule } from '@angular/material/icon';
import { Habit } from 'src/app/model/routine.model';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable, map } from 'rxjs';
import { OrAlternatives, isAlternatives, isSingleElement } from 'src/app/model/common.model';
import * as _ from 'lodash';

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
  largestAlternativeGroup = 1;

  constructor(private readonly recipeService: RecipeService) {
    this.allRecipes$ = recipeService.currentUserRecipes();
  }

  ngOnInit() {
    this.largestAlternativeGroup = _.max(
      _.map(this.habit.recipes, (r: OrAlternatives<Recipe>) =>
        isAlternatives(r) ? r.alternatives.length : 1
      )
    ) || 1
  }

  setEditing(value: boolean) {
    this.editing = value;
  }

  rename(name: string) {
    this.update.emit(this.habit.rename(name));
  }

  menuItemSelected(item: MenuItem) {
    switch (item.name) {
      case MenuItemNames.EDIT:
        this.setEditing(true);
        break;
      case MenuItemNames.DELETE:
        this.delete.emit();
        break;
    }
  }

  addRecipe() {
    const randomRecipe$ = this.allRecipes$.pipe(
      map((recipes: Recipe[]) => recipes[0])
    );
    randomRecipe$.subscribe(recipe => {
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

  min = Math.min;
  isAlternatives = isAlternatives;
  isSingleElement = isSingleElement;
}
