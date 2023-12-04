import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'app-edit-button',
  template: `
    <button mat-icon-button>
      <mat-icon>edit</mat-icon>
    </button>`,
  imports: [MatButtonModule, MatIconModule]
})
export class EditButtonComponent { }