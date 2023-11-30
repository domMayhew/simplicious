import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FullGridWidthComponent } from '../ui/full-grid-width/full-grid-width.component';

@Component({
  selector: 'app-with-nav',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FullGridWidthComponent],
  templateUrl: './with-nav.component.html',
  styleUrls: ['./with-nav.component.scss']
})
export class WithNavComponent {

}
