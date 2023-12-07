import { Component, EventEmitter, Output } from '@angular/core';
import { InstructionComponent } from './instruction/instruction.component';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [InstructionComponent, NgFor, MatButtonModule]
})
export class WelcomeComponent {
  @Output() finished: EventEmitter<boolean> = new EventEmitter();

  instructions: Instruction[] = [
    {
      title: "Add some recipes",
      content: "Make each meal unique by adding ingredient alternatives in a recipe. Simplicious will choose one of the alternatives for you each time you generate a shopping list. For example, make a recipe different options for the main protein or carbohydrate source used."
    },
    {
      title: "Create a routine",
      content: "Tell Simplicious about your habits and preferences so it can help you plan. Make a list of recipes that you eat each week that will automatically be added to new shopping lists. To add variety to your routine, add alternatives for a recipe and Simplicious will choose one at random when you generate a new shopping list. For example, if you do not want to eat tacos every single week, add an alternative and Simplicious will make a grocery shopping list that includes ingredients for one or the other. Once Simplicious has chosen a recipe from a set of alternatives, it will choose the specific ingredients from any ingredient alternatives you defined in that specific recipe."
    },
    {
      title: "Generate a shopping list",
      content: "Generate a shopping list from your routine, and add any other items you need. Hover over an item to see what recipes require it!"
    }
  ]

  callToAction() {
    this.finished.emit(true);
  }
}

interface Instruction {
  title: string;
  content: string;
}