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
  const knex = getKnex();
  return {
    user: new PgUserRepo(knex),
    wing: new PgWingRepo(knex),
    flight: new PgFlightRepo(knex),
  };
};

// eslint-disable-next-line no-console
console.log("Repositories are : ", process.env.IN_MEMORY_REPOS ? "IN MEMORY" : "PG");

export const repositories = process.env.IN_MEMORY_REPOS
  ? getInMemoryRepos()
  : getPgRepos();
