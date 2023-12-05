import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { RoutinesService } from '../services/routines.service';
import { Recipe, Routine, RoutineDay, RoutineGroup } from '../model';
import { RoutineGroupComponent } from './routine-group/routine-group.component';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, WithNavComponent, RoutineGroupComponent],
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.scss']
})
export class RoutinesComponent {
  readonly routines: Routine[];

  constructor(private readonly routinesService: RoutinesService) {
    this.routines = routinesService.getRoutines();
  }

  deleteDay(day: RoutineDay) {
    this.delete(this.routines[0].days, day);
  }

  deleteGroup(group: RoutineGroup) {
    this.delete(this.routines[0].groups, group);
  }

  private delete(list: RoutineGroup[], group: RoutineGroup) {
    const index = list.indexOf(group);
    if (index >= 0) {
      list.splice(index, 1);
    }

  }
}
