import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: 'app-main-fab',
  imports: [MatButtonModule],
  template: `
    <button
      attr.position={{position}}
      mat-raised-button
      color="accent">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    @use '../../theme.scss';

    button {
      @include theme.main-page-fab();

      &[position=bottom-right] {
        position: fixed;
        right: theme.padding(very-large);
        bottom: theme.padding(very-large);
      }
    }
  `]
})
export class MainFab {
  @Input() position: 'bottom-right' | undefined = undefined;
}