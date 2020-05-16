import { createInMemoryEventBus, EventBus, RedisEventBus } from "@paralogs/back-shared";

import { InMemoryUserRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { getKnex } from "../adapters/secondaries/repositories/postGres/knex/db";
import { PgUserRepo } from "../adapters/secondaries/repositories/postGres/users/PgUserRepo";
import { UserRepo } from "../domain/gateways/UserRepo";
import { ENV, EventBusOption, RepositoriesOption } from "./env";

const shouldNeverBeCalled = (arg: never) => {
  throw new Error("Should never be called");
};

interface Repositories {
  user: UserRepo;
}

const getInMemoryRepos = (): Repositories => ({
  user: new InMemoryUserRepo(),
});

const getPgRepos = (): Repositories => {
  const knex = getKnex(ENV.environment);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  knex.migrate.latest();
  // TODO: await when updating eslint and prettier
  return {
    user: new PgUserRepo(knex),
  };
};

const getRepositories = (repositories: RepositoriesOption): Repositories => {
  switch (repositories) {
    case "IN_MEMORY":
      return getInMemoryRepos();
    case "PG":
      return getPgRepos();
    default:
      return shouldNeverBeCalled(repositories);
  }
};

const getEventBus = (repositories: EventBusOption): EventBus => {
  switch (repositories) {
    case "IN_MEMORY":
      return createInMemoryEventBus({ getNow: () => new Date() });
    case "REDIS":
      return RedisEventBus;
    default:
      return shouldNeverBeCalled(repositories);
  }
};

export const repositories = getRepositories(ENV.repositories);

export const eventBus = getEventBus(ENV.eventBus);
