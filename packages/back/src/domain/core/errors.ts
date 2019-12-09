export const notUnique = (entityName: string) =>
  new Error(`Cannot create entity. ${entityName} Id is already used`);

export const noBodyProvided = (entityName: string) =>
  new Error(`No body was provided. Expected ${entityName}`);

export const noCurrentUser = () => new Error(`No currentUser. Please login first`);
