declare namespace Express {
  export interface Request {
    currentUser: import("../../src/domain/entities/UserEntity").UserEntity;
  }
}
