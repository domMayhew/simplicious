import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-card-title',
  imports: [CommonModule],
  template: `
  		<div class="card-title-container">
			<h4 *ngIf="!editing"
				class="card-title">
				{{title || 'Untitled'}}
			</h4>
			<input #titleInput
				*ngIf="editing"
				[value]="title || 'Untitled'"
				(blur)="titleChange(titleInput.value)"
				class="title-input"
				type="text">
		</div>
`,
  styles: [`
    @use '../../theme.scss';

    :host {
      max-width: 80%;
    }

    .card-title-container {
      padding-bottom: theme.padding(medium);
      margin-bottom: theme.padding(large);
      border-bottom: 1px solid black;
      max-width: 100%;
    }

    .card-title,
    .title-input {
      @include theme.typography-level(headline-4);
      max-width: 100%;
    }
  `]
})
export class CardTitleComponent {
  @Input() editing = false;
  @Input({ required: true }) title!: string;
  @Output('titleChange') titleChangeEvent: EventEmitter<string> = new EventEmitter();

  titleChange(title: string) {
    const trimmed = title.trim();
    const firstNewline = title.indexOf("\n");
    const firstLine = firstNewline === -1 ? trimmed : trimmed.substring(0, firstNewline);
    const newTitle = firstLine || 'Untitled';
    this.titleChangeEvent.emit(newTitle);
  }
}