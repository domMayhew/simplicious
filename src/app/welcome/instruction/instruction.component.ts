import { Component, Input } from '@angular/core';
import { NumberComponent } from './number/number.component';

@Component({
  selector: 'app-instruction',
  standalone: true,
  imports: [NumberComponent],
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss'],
})
export class InstructionComponent {
  @Input({ required: true }) stepNumber!: number;
  @Input({ required: true }) title!: string;
  @Input({ required: false }) content: string | undefined;
}
