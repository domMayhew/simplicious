import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../model';

@Pipe({
  standalone: true,
  name: 'ingredientQuantity'
})
export class IngredientQuantityPipe implements PipeTransform {
  private unitsPrefix(value: Ingredient) {
    return `${value.quantity} ${value.units} of `;
  }

  private noUnitsPrefix(value: Ingredient) {
    return `${value.quantity} `;
  }

  transform(value: Ingredient): string {
    const unitString = value.units ? ' ' + value.units : '';
    return value.quantity + unitString;
  }

}
