import { Injectable } from '@angular/core';
import { Alternatives, SelectionMethod } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class AlternativesService {

  constructor() { }

  private priorityChoice = (length: number) => 0;
  private orderedChoice = (iteration: number, length: number) => iteration % length;
  private randomChoice = (length: number) => Math.floor(Math.random() * length);

  public chooseAlternative = <T>(iteration: number) => (alternativesGroup: Alternatives<T>) => {
    const length = alternativesGroup.alternatives.length;
    switch (alternativesGroup.method) {
      case SelectionMethod.DEFAULT:
        return this.priorityChoice(length);
      case SelectionMethod.ORDERED:
        return this.orderedChoice(iteration, length);
      case SelectionMethod.RANDOM:
        return this.randomChoice(length);
    }
  }
}
