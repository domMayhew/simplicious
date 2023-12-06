import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  standalone: true,
  selector: 'app-checkbox',
  imports: [CommonModule],
  template: `
    <div class="checkbox">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <use href='/assets/icons/checkbox.svg#border'/>
        <use *ngIf="checked" href='/assets/icons/checkbox.svg#check'/>
      </svg>
    </div>
  `,
  styles: [``]
})
export class CheckboxComponent {
  @Input() checked = false;
}