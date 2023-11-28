import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent {
  @Input({ required: true }) stepNumber!: number;
  @Input({ required: false }) diameter: number | undefined;

}
