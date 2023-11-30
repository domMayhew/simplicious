import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullGridWidthComponent } from '../ui/full-grid-width/full-grid-width.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FullGridWidthComponent, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

}
