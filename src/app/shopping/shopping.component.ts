import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { MainFab } from '../ui/main-fab.component';
import { MatMenuModule } from '@angular/material/menu';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RoutineService } from '../services/routine.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ShoppingList } from '../model/shopping.model';
import { Routine } from '../model/routine.model';
import { ShoppingService } from '../services/shopping.service';
import { ArrayService } from '../services/array.service';
import { UUID } from '../model/user.model';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, WithNavComponent, MainFab, MatMenuModule, ShoppingListComponent],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {
  lists = new BehaviorSubject<ShoppingList[]>([]);

  constructor(
    private readonly routineService: RoutineService,
    private readonly shoppingService: ShoppingService,
    private readonly arrayService: ArrayService) { }

  newList() {
    this.selectRoutine().subscribe(routine => {
      const populatedRoutine = this.routineService.populate(routine);
      const list = this.shoppingService.generateList(populatedRoutine);
      const newLists = this.arrayService.addToStart(this.lists.getValue(), list);
      this.lists.next(newLists);
    })
  }

  private selectRoutine(): Observable<Routine> {
    return this.routineService.routines$.pipe(
      map(routines => routines[0])
    );
  }

  identifyList(index: number, list: ShoppingList): UUID {
    return list.id;
  }
}
