import { getKnex } from "../adapters/secondaries/repositories/postGres/knex/db";
import { InMemoryUserRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { UserRepo } from "../domain/gateways/UserRepo";
import { PgUserRepo } from "../adapters/secondaries/repositories/postGres/users/PgUserRepo";
import { ENV } from "./env";

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
  return {
    user: new PgUserRepo(knex),
  };
};

type RepositoriesOption = "IN_MEMORY" | "PG";

const getRepositories = (repositories: RepositoriesOption) => {
  // eslint-disable-next-line no-console
  console.log("Repositories are : ", repositories);

  switch (repositories) {
    case "IN_MEMORY":
      return getInMemoryRepos();
    case "PG":
      return getPgRepos();
    default:
      throw new Error("REPOSITORIES where not defined");
  }
};

export const repositories = getRepositories(
  process.env.REPOSITORIES! as RepositoriesOption,
);
