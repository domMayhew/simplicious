import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'app-add-alternative',
  template: `
  <button class="add-alternative"
    mat-mini-fab
    color="primary">
    <mat-icon>add</mat-icon>
  </button>
  `,
  styles: [`
  @use '../../../../theme.scss';
  .add-alternative {
    width: theme.token-height();
    height: theme.token-height();
  }
  `],
  imports: [MatButtonModule, MatIconModule]
})
export class AddAlternativeButton { }