import { InMemoryWingRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { InMemoryUserRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryUserRepo";
import { UserRepo } from "../domain/gateways/UserRepo";
import { WingRepo } from "../domain/gateways/WingRepo";
import { FlightRepo } from "../domain/gateways/FlightRepo";
import { InMemoryFlightRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";
import { PgUserRepo } from "../adapters/secondaries/repositories/postGres/users/PgUserRepo";
import { getKnex } from "../adapters/secondaries/repositories/postGres/db";
import { PgWingRepo } from "../adapters/secondaries/repositories/postGres/wings/PgWingRepo";
import { PgFlightRepo } from "../adapters/secondaries/repositories/postGres/flights/PgFlightRepo";
import { ENV } from "./env";

interface Repositories {
  user: UserRepo;
  wing: WingRepo;
  flight: FlightRepo;
}

const getInMemoryRepos = (): Repositories => ({
  user: new InMemoryUserRepo(),
  wing: new InMemoryWingRepo(),
  flight: new InMemoryFlightRepo(),
});

const getPgRepos = (): Repositories => {
  const knex = getKnex(ENV.environment);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  knex.migrate.latest();
  return {
    user: new PgUserRepo(knex),
    wing: new PgWingRepo(knex),
    flight: new PgFlightRepo(knex),
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
