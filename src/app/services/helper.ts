import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";

function getStoredValues<T, J>(localStorageKey: string, fromObj: (obj: J) => T): Observable<T[]> | undefined {
  const storedJson = localStorage.getItem(localStorageKey);
  const classInstances = storedJson && storedJson.length ?
    JSON.parse(storedJson).map(fromObj)
    : undefined;
  if (!classInstances || !classInstances?.length || classInstances.length <= 0) {
    return undefined;
  } else {
    return new BehaviorSubject(classInstances);
  }
}

const getDefaultValues = <T, J>(http: HttpClient, url: string, fromObj: (j: J) => T): Observable<T[]> => {
  const objs$ = http.get<J[]>(url.toString());
  return objs$.pipe(
    map(
      (objs: J[]) => objs.map(fromObj)
    )
  );
}

export const getValues = <T, J>(
  http: HttpClient,
  localStorageKey: string,
  url: string,
  fromObj: (j: J) => T): Observable<T[]> => {
  const storedValues = getStoredValues(localStorageKey, fromObj);
  return storedValues !== undefined ?
    storedValues :
    getDefaultValues(http, url, fromObj);
}

export const persistValues = <T, J>(
  localStorageKey: string,
  toObj: (t: T) => J) =>
  (instances: T[]): void => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(instances.map(toObj))
    );
  }