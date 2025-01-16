import { Observable, of } from "rxjs";
import {
  initial as initialRD,
  pending as pendingRD,
  success as successRD,
  failure as failureRD,
  RemoteData,
} from "./remoteData.utils";

export type LiveData<E, A> = Observable<RemoteData<A, E>>;

export const initial: <E = never, A = never>() => LiveData<E, A> = () =>
  of(initialRD());
export const pending: <E = never, A = never>() => LiveData<E, A> = () =>
  of(pendingRD());
export const success = <E = never, A = never>(a: A): LiveData<E, A> =>
  of(successRD(a));
export const failure = <E = never, A = never>(e: E): LiveData<E, A> =>
  of(failureRD(e));
