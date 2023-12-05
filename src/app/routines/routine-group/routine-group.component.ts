import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe, RoutineGroup } from 'src/app/model';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from 'src/app/ui/card.component';
import { MenuItem, MenuItemNames, SettingsButtonComponent } from 'src/app/ui/settings-button.component';
import { MatButtonModule } from '@angular/material/button';
import { RoutineRecipeComponent } from '../routine-recipe/routine-recipe.component';
import { OrTokenComponent } from 'src/app/ui/tokens/or-token/or-token.component';
import { AddAlternativeButton } from 'src/app/recipes/recipe/ingredient-list/add-alternative.component';
import { RecipesService } from 'src/app/services/recipes.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-routine-group',
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
    AddAlternativeButton
  ],
  templateUrl: './routine-group.component.html',
  styleUrls: ['./routine-group.component.scss']
})
export class RoutineGroupComponent {
  @Input({ required: true }) group!: RoutineGroup;
  @Input() editing = false;
  @Output() deleteGroup: EventEmitter<void> = new EventEmitter();

  allRecipes: Recipe[];

  constructor(private readonly recipesService: RecipesService) {
    this.allRecipes = recipesService.getRecipes();
  }

  setEditing(value: boolean) {
    this.editing = value;
  }

  changeTitle(newTitle: string) {
    console.log("Changing title to: '" + newTitle + "'");
  }

  menuItemSelected(item: MenuItem) {
    switch (item.name) {
      case MenuItemNames.EDIT:
        this.setEditing(true);
        break;
      case MenuItemNames.DELETE:
        this.deleteGroup.emit();
        break;
    }
  }

  changeRecipe(old: Recipe, newRecipe: Recipe) {
    const index = this.group.recipes.indexOf(old);
    if (index >= 0) {
      this.group.recipes.splice(index, 1, newRecipe);
    }
  }

  addAlternative() {
    const randomRecipe = this.allRecipes.find(r => !this.group.recipes.some(groupRecipe => groupRecipe.title === r.title));
    this.group.recipes.push(randomRecipe || this.group.recipes[0]);
  }

  deleteAlternative(alternative: Recipe) {
    const index = this.group.recipes.indexOf(alternative);
    if (index >= 0) {
      this.group.recipes.splice(index, 1);
    }
  }
  min = Math.min
}
