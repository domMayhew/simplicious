import { CommonModule } from "@angular/common";
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CardTitleComponent } from "./card-title.component";

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule, MatCardModule, CardTitleComponent],
  template: `
    <mat-card>
      <div class="card-header">
        <app-card-title [title]="title"
          [editing]="editing"
          (titleChange)="titleChange($event)"></app-card-title>
        <ng-container *ngTemplateOutlet="settingsButtons"></ng-container>
      </div>
      <ng-content></ng-content>
    </mat-card>

  `,
  styles: [`
    @use '../../theme.scss';

    mat-card {
      padding: theme.padding(large);
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      column-gap: theme.padding(large);
    }

    .card-header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
  `]
})
export class CardComponent {
  @Input({ required: true }) title!: string;
  @Input() editing = false;
  @Output('titleChange') titleChangeEvent: EventEmitter<string> = new EventEmitter();
  @ContentChild('settingsButtons') settingsButtons!: TemplateRef<any>;

  titleChange(newTitle: string) {
    this.titleChangeEvent.emit(newTitle);
  }
}