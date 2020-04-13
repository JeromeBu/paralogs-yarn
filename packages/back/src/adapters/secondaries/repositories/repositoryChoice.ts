import { InMemoryWingRepo } from "./inMemory/InMemoryWingRepo";
import { InMemoryUserRepo } from "./inMemory/InMemoryUserRepo";
import { UserRepo } from "../../../domain/port/UserRepo";
import { WingRepo } from "../../../domain/port/WingRepo";
import { FlightRepo } from "../../../domain/port/FlightRepo";
import { InMemoryFlightRepo } from "./inMemory/InMemoryFlightRepo";
import { PgUserRepo } from "./postGres/users/PgUserRepo";
import { getKnex } from "./postGres/db";
import { PgWingRepo } from "./postGres/wings/PgWingRepo";
import { PgFlightRepo } from "./postGres/flights/PgFlightRepo";
import { ENV } from "../../../config/env";

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
