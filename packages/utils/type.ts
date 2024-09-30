// export type SelectiveRequired<T, R extends keyof T, P extends keyof T> = Omit<
//   T,
//   R | P
// > &
//   Required<Pick<T, R>> &
//   Partial<Pick<T, P>>;

export type SelectiveRequired<T, R extends keyof T = never> = Required<
  Pick<T, R>
> &
  Partial<Omit<T, R>>;
