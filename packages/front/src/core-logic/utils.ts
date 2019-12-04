export interface ErrorFromAction {
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const shouldNeverBeCalled = (param: never) => {
  // Function is used only to type check that it is never called
};
