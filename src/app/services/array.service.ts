import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  constructor() { }

  add<T>(arr: T[], el: T): T[] {
    const newArr = _.cloneDeep(arr);
    return [...newArr, el];
  }

  addToStart<T>(arr: T[], el: T): T[] {
    const newArr = _.cloneDeep(arr);
    return [el, ...newArr];
  }

  remove<T>(arr: T[], i: number): T[] {
    const prefix = _.take(arr, i);
    const suffix = _.drop(arr, i + 1);
    return _.concat(prefix, suffix);
  }

  update<T>(arr: T[], i: number, el: T) {
    const newArr = _.cloneDeep(arr);
    newArr[i] = el;
    return newArr;
  }
}
