import { UserId, Result, fromNullable } from "@paralogs/shared";
import Knex from "knex";
import { UserEntity, UserPersistence } from "../../../../../domain/entities/UserEntity";
import { Email } from "../../../../../domain/valueObjects/user/Email";
import { userPersistenceMapper } from "./userPersistenceMapper";

export const createPgUserRepo = (knex: Knex<any, unknown[]>) => {
  return {
    async create(userEntity: UserEntity): Promise<Result<UserEntity>> {
      const userPersistence = userPersistenceMapper.toPersistence(userEntity);

      try {
        await knex("users").insert(userPersistence);
        return Result.ok(userEntity);
      } catch (error) {
        const isEmailTaken: boolean =
          error.detail.includes("already exists") && error.detail.includes("email");
        return Result.fail(
          isEmailTaken ? "Email is already taken. Consider logging in." : error.detail,
        );
      }
    },

    async findByEmail(email: Email) {
      const userPgOrUndefined = await knex
        .from<UserPersistence>("users")
        .where({ email: email.value })
        .first();
      return fromNullable(userPgOrUndefined).map(userPersistence =>
        userPersistenceMapper.toEntity(userPersistence),
      );
    },

    async findById(userId: UserId) {
      const userPersistence = await knex
        .from<UserPersistence>("users")
        .where({ id: userId })
        .first();
      return userPersistence && userPersistenceMapper.toEntity(userPersistence);
    },
  };
};
