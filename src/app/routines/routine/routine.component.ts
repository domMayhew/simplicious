import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habit, Routine } from 'src/app/model/routine.model';
import { HabitComponent } from '../habit/habit.component';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [CommonModule, HabitComponent],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {
  @Input({ required: true }) routine!: Routine;
  @Input() editing = false;
  @Output() update = new EventEmitter<Routine>();
  @Output() delete = new EventEmitter<void>();

  rename = (name: string) => {
    this.update.emit(
      this.routine.rename(name)
    );
  }

  addHabit = () => {
    this.update.emit(
      this.routine.addHabit(new Habit('Untitled', []))
    );
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
}
