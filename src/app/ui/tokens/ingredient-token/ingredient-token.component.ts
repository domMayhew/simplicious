import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-ingredient-token',
  templateUrl: './ingredient-token.component.html',
  styleUrls: ['./ingredient-token.component.scss'],
  imports: [CommonModule]
})
export class IngredientTokenComponent {
  @Input({ required: true }) content!: string;

  @Input() editing: boolean = false;

  ngOnInit() {
    document.getElementById
  }

  doneEditing() {
    window.alert("Triggered");
    this.editing = false;
  }

  startEditing() {
    this.editing = true;
  }
}
