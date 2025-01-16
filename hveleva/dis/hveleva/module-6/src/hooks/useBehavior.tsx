import { BehaviorSubject } from "rxjs";
import { useObservable } from "./useObservable";

export const useBehavior = <T extends unknown>(
  property: BehaviorSubject<T>
): T => useObservable(property, property.getValue());
