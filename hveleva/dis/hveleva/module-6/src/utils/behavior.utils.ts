import { BehaviorSubject } from "rxjs";

export type BehaviorAdapter<A> = [(a: A) => void, BehaviorSubject<A>];

export const createBehaviorAdapter = <A extends unknown>(
  initial: A
): BehaviorAdapter<A> => {
  const bs = new BehaviorSubject(initial);
  return [(value) => bs.next(value), bs];
};
