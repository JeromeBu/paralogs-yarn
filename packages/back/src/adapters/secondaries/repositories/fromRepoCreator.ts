export type FromRepoCreator<T extends () => any, R> = ReturnType<T> extends R
  ? ReturnType<T>
  : never;
