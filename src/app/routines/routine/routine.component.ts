import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habit, Routine } from 'src/app/model/routine.model';
import { HabitComponent } from '../habit/habit.component';
import { MainFab } from 'src/app/ui/main-fab.component';
import { UUID } from 'src/app/model/user.model';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [CommonModule, HabitComponent, MainFab],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {
  @Input({ required: true }) routine!: Routine;
  @Input() editing = false;
  @Output() update = new EventEmitter<Routine>();
  @Output() delete = new EventEmitter<void>();
  @ViewChildren(HabitComponent) habitRefs!: QueryList<HabitComponent>;

  rename = (name: string) => {
    this.update.emit(
      this.routine.rename(name)
    );
  }

  addHabit = () => {
    const id = UUID.randomUUID();
    this.update.emit(
      this.routine.addHabit(new Habit(id, 'Untitled', []))
    );
    setTimeout(() => {
      this.habitRefs.last.scrollIntoView();
      this.habitRefs.last.editing = true;
    })
  }

  updateHabit = (i: number) => (habit: Habit) => {
    this.update.emit(
      this.routine.updateHabit(i, habit)
    );
  }

  deleteHabit = (i: number) => {
    this.update.emit(
      this.routine.deleteHabit(i)
    );
  }

  identifyHabit = (index: number, habit: Habit) => habit.id;
}
