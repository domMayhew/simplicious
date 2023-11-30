import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithNavComponent } from '../with-nav/with-nav.component';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, WithNavComponent],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {

}
