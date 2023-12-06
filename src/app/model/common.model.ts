import * as _ from 'lodash';

export class ArgValidator {
  constructor(args: any[], className?: string) {
    if (_.some(args, args => args === undefined)) {
      throw new Error(`Undefined parameter in list for ${className} constructor: ${args.join(", ")}`);
    }
  }
}

export type OrAlternatives<T> = Alternatives<T> | T;

export type OrAlternativesJson<ObjType> = ObjType | AlternativesJson<ObjType>;

export function orAlternativeFromObj<T, ObjType>(
  constructor: (obj: ObjType) => T,
  obj: OrAlternativesJson<ObjType>): OrAlternatives<T> {
  if (isAlternativeJson<ObjType>(obj)) {
    const name = obj.name;
    const alternatives = _.map(obj.alternatives, constructor);
    return new Alternatives(name, alternatives);
  } else {
    return constructor(obj);
  }
}

export class Alternatives<T> {
  constructor(readonly name: string, readonly alternatives: T[], readonly method?: SelectionMethod) { }

  rename(name: string): Alternatives<T> {
    return new Alternatives(name, this.alternatives, this.method);
  }

  addAlternative(el: T): Alternatives<T> {
    return new Alternatives(this.name, [...this.alternatives, el], this.method);
  }

  deleteAlternative(i: number) {
    return new Alternatives(this.name, remove(this.alternatives, i));
  }

  updateAlternative(i: number, el: T): Alternatives<T> {
    return new Alternatives(this.name, update(this.alternatives, i, el), this.method);
  }

  newSelectionMethod(method: SelectionMethod): Alternatives<T> {
    return new Alternatives(this.name, this.alternatives, method);
  }

  fromObj<ObjType>(constructor: (obj: ObjType) => T, obj: AlternativesJson<ObjType>): Alternatives<T> {
    const name = obj.name;
    const alternatives = _.map(obj.alternatives, constructor);
    return new Alternatives(name, alternatives);
  }
}

interface AlternativesJson<T> {
  name: string;
  alternatives: T[];
}

function isAlternativeJson<ObjType>(obj: any): obj is AlternativesJson<ObjType> {
  return Object.hasOwn(obj as Object, 'name') && Object.hasOwn(obj as Object, 'alternatives');
}

export function isAlternatives<T>(oa: OrAlternatives<T>): oa is Alternatives<T> {
  return Object.hasOwn(oa as Object, 'name') && Object.hasOwn(oa as Object, 'alternatives');
}

export function isSingleElement<T>(oa: OrAlternatives<T>): oa is T {
  return !isAlternatives(oa);
}

export function add<T>(arr: T[], el: T): T[] {
  const newArr = _.cloneDeep(arr);
  return [...newArr, el];
}

export function remove<T>(arr: T[], i: number): T[] {
  const prefix = _.take(arr, i);
  const suffix = _.drop(arr, i + 1);
  return _.concat(prefix, suffix);
}

export function update<T>(arr: T[], i: number, el: T) {
  const newArr = _.cloneDeep(arr);
  newArr[i] = el;
  return newArr;
}

export enum SelectionMethod {
  RANDOM,
  ORDERED,
  DEFAULT
}