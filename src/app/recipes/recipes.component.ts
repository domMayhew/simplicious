import { Component } from '@angular/core';
import { WithNavComponent } from '../with-nav/with-nav.component';

@Component({
  standalone: true,
  selector: 'app-meals',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [WithNavComponent]
})
export class RecipesComponent {

}
