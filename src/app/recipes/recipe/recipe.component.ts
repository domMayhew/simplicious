import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [CommonModule, MatCardModule]
})
export class RecipeComponent {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() caption: string = '';
  @Input() ingredients: string[] = [];
  @Input() instructions: string = '';
  @ContentChild('nodeTemplate') actions: TemplateRef<any> | undefined = undefined;


}
