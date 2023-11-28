import { Component } from '@angular/core';
import { InstructionComponent } from './instruction/instruction.component';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [InstructionComponent, NgFor]
})
export class WelcomeComponent {
  instructions: Instruction[] = [
    {
      title: "Add your go-to meals",
      content: "Build variety into your week by defining a meal with options. For example, create a “Roast Veg” meal that has rice, vegetables, and one of either chicken, ground beef, or pork chops."
    },
    {
      title: "Create a template",
      content: "Tell Simplicious about your habits and preferences so it can help you plan. A template has meals, requests, or ingredients to help you make a meal plan more efficiently."
    },
    {
      title: "Make a meal plan",
      content: "Generate a meal plan from a template and customize it to meet your current needs. Not in the mood for the meal Simplicious selected? Switch it easily. Want to make a different choice about a meal variation? Pick a different variation."
    },
    {
      title: "Generate a shopping list",
      content: "Generate a shopping list from your meal plan, and add any other items you need. Need some batteries? Add it to the list!"
    }
  ]
}

interface Instruction {
  title: string;
  content: string;
}