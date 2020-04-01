import { UserId, Result, fromNullable } from "@paralogs/shared";
import { UserRepo } from "../../../../domain/port/UserRepo";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { Email } from "../../../../domain/valueObjects/user/Email";
import { FromRepoCreator } from "../fromRepoCreator";

export const createInMemoryUserRepo = () => {
  const _users: UserEntity[] = [];

  return {
    create: async (userEntity: UserEntity) => {
      const isEmailTaken = !!_users.find(
        user => user.getProps().email.value === userEntity.getProps().email.value,
      );
      if (isEmailTaken)
        return Result.fail<UserEntity>("Email is already taken. Consider logging in.");
      _users.push(userEntity);
      return Result.ok(userEntity);
    },

    findByEmail: async (email: Email) =>
      fromNullable(
        _users.find(userEntity => userEntity.getProps().email.value === email.value),
      ),

    async findById(userId: UserId) {
      return _users.find(userEntity => {
        return userEntity.id === userId;
      });
    },

    users() {
      return _users;
    },

    setUsers(users: UserEntity[]) {
      _users.splice(0, users.length, ...users);
    },
  };
};

export type InMemoryUserRepo = FromRepoCreator<typeof createInMemoryUserRepo, UserRepo>;
