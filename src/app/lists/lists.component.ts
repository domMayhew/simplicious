import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithNavComponent } from '../with-nav/with-nav.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, WithNavComponent],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {

}
