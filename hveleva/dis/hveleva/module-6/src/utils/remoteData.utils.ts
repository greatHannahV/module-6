declare type RemotePending = {
  readonly _tag: "Pending";
};
declare type RemoteFailure<E> = {
  readonly _tag: "Failure";
  readonly error: E;
};
declare type RemoteSuccess<A> = {
  readonly _tag: "Success";
  readonly value: A;
};
declare type RemoteInitial = {
  readonly _tag: "Initial";
};
export type RemoteData<A, E = unknown> =
  | RemoteInitial
  | RemotePending
  | RemoteFailure<E>
  | RemoteSuccess<A>;

export const initial = (): RemoteInitial => ({ _tag: "Initial" });
export const pending = (): RemotePending => ({ _tag: "Pending" });
export const success = <A>(value: A): RemoteSuccess<A> => ({
  _tag: "Success",
  value,
});
export const failure = <E>(error: E): RemoteFailure<E> => ({
  _tag: "Failure",
  error,
});
