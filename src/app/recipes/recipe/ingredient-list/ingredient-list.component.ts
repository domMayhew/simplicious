import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IngredientSelection } from 'src/app/model';
import { IngredientQuantityPipe } from 'src/app/pipes/ingredient-quantity.pipe';
import { IngredientTokenComponent } from 'src/app/ui/tokens/ingredient-token/ingredient-token.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddOptionComponent } from 'src/app/ui/tokens/add-option/add-option.component';
import { OrTokenComponent } from 'src/app/ui/tokens/or-token/or-token.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  imports: [
    IngredientQuantityPipe,
    CommonModule,
    IngredientTokenComponent,
    MatTooltipModule,
    AddOptionComponent,
    OrTokenComponent,
    MatButtonModule,
    MatIconModule,
  ]
})
export class IngredientListComponent {
  @Input({ required: true }) items!: IngredientSelection[];
}
