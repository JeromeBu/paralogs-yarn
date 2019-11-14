export const notUnique = (entityName: "Wing") =>
  new Error(`Cannot create entity. ${entityName} Id is already used`);
