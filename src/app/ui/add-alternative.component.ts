import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  standalone: true,
  selector: 'app-add-alternative',
  template: `
  <button class="add-alternative"
    mat-mini-fab
    color="primary"
    matTooltip="Add an alternative"
    matTooltipPosition="right"
    matTooltipShowDelay="500">
    <mat-icon>add</mat-icon>
  </button>
  `,
  styles: [`
  @use '../../theme.scss';
  .add-alternative {
    width: theme.token-height();
    height: theme.token-height();

    mat-icon {
      width: theme.token-height();
      height: theme.token_height();
    }
  }
  `],
  imports: [MatButtonModule, MatIconModule, MatTooltipModule]
})
export class AddAlternativeButton { }