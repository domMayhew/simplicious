import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'app-edit-button',
  template: `
      <mat-icon>edit</mat-icon>
    `,
  styles: [`
    @use '../../theme.scss';
    mat-icon {
      color: theme.token-color();
    }
  `],
  imports: [MatButtonModule, MatIconModule]
})
export class EditButtonComponent { }