import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { Observable } from "rxjs";
import { UUID } from "src/app/model/user.model";

@Component({
  standalone: true,
  selector: 'app-recipe-select',
  imports: [CommonModule, MatMenuModule],
  template: `
    <button *ngFor="let recipe of (recipes$ | async)"
      (click)="recipeSelected.emit(recipe)"
      mat-menu-item>
      {{recipe[1]}}
    </button>
  `,
  styles: [``]
})
export class RecipeSelectComponent {
  @Input({ required: true }) recipes$!: Observable<[UUID, string][]>;
  @Output() recipeSelected = new EventEmitter<[UUID, string]>
}