import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithNavComponent } from '../with-nav/with-nav.component';
import { RoutineService } from '../services/routine.service';
import { Routine } from '../model/routine.model';
import { Observable } from 'rxjs';
import { RoutineComponent } from './routine/routine.component';
import { UUID } from '../model/user.model';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, WithNavComponent, RoutineComponent],
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.scss']
})
export class RoutinesComponent {
  readonly routines$: Observable<Routine[]>;

  constructor(private readonly routineService: RoutineService) {
    this.routines$ = routineService.routines$;
  }

  addRoutine() {
    const id = UUID.randomUUID();
    this.routineService.addRoutine(new Routine(id, 'Untitle Routine', []));
  }

  deleteRoutine(i: number) {
    this.routineService.deleteRoutine(i);
  }

  updateRoutine = (i: number) => (routine: Routine) => {
    this.routineService.updateRoutine(i)(routine);
  }

  identifyRoutine = (index: number, routine: Routine) => routine.id;
}
