export interface ErrorFromAction {
  message: string;
}

export const shouldNeverBeCalled = (param: never) => {
  // eslint-disable-next-line no-console
  console.log("Should not be called ever, was called with :", param);
  throw new Error("Should not be called ever");
};
