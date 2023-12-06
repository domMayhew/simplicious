import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Recipe } from "src/app/model/recipe.model";
import { AddAlternativeButton } from "src/app/ui/add-alternative.component";

@Component({
  standalone: true,
  selector: 'app-recipe-token',
  template: `
    <div class="recipe-token-image">
      <img [src]="recipe.image.url"
        [matTooltip]="recipe.image.caption">
    </div>
    <span class="recipe-name">
      {{recipe.name}}
    </span>
    <app-add-alternative *ngIf="editing && isLast" (click)="addAlternative.emit()"></app-add-alternative>
    <mat-icon *ngIf="editing" class="delete" (click)="delete.emit()">delete</mat-icon>
  `,
  styles: [`
    @use '../../../theme.scss';
    :host {
      display: grid;
      grid-template-rows: 50px 1fr;
      grid-template-columns: 50px 1fr 0fr;
      row-gap: theme.padding(medium);
      column-gap: theme.padding(medium);
    }

    .recipe-token-image {
      grid-row: 1 / span 1;
      grid-column: 1 / span 1;
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

    .recipe-name {
      grid-row: 1 / span 1;
      grid-column: 2 / span 1;
      align-self: center;
    }

    app-add-alternative {
      grid-row: 1 / span 1;
      grid-column: 3 / span 1;
      align-self: center;
    }

    .delete {
      grid-row: 2 / span 1;
      grid-column: 1 / span 1;
      justify-self: center;
      color: theme.get-color(warn);
    }
  `],
  imports: [CommonModule, MatTooltipModule, MatIconModule, AddAlternativeButton]
})
export class RecipeTokenComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Input() editing = false;
  @Input() isLast = false;
  @Output() delete = new EventEmitter<void>();
  @Output() addAlternative = new EventEmitter<void>();
}