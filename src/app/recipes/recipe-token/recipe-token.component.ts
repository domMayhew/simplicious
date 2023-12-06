import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Recipe } from "src/app/model/recipe.model";

@Component({
  standalone: true,
  selector: 'app-recipe-token',
  template: `
    <div class="recipe-token-image">
      <img [src]="recipe.image.url"
        [matTooltip]="recipe.image.caption">
    </div>
    <span>
      {{recipe.name}}
    </span>
  `,
  styles: [`
    @use '../../../theme.scss';
    :host {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      gap: theme.padding(medium);
    }

    .recipe-token-image {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      border: 3px solid black;
      overflow: hidden;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
      }
    }
  `],
  imports: [CommonModule, MatTooltipModule]
})
export class RecipeTokenComponent {
  @Input({ required: true }) recipe!: Recipe;
}