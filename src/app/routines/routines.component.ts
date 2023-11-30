import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithNavComponent } from '../with-nav/with-nav.component';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, WithNavComponent],
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.scss']
})
export class RoutinesComponent {

}
