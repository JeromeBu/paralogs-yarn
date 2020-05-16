import {
  createInMemoryEventBus,
  EventBus,
  RedisEventBus,
} from "@paralogs/back-shared";

import { InMemoryFlightRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";
import { InMemoryPilotRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryPilotRepo";
import { InMemoryWingRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { getKnex } from "../adapters/secondaries/repositories/postGres/db";
import { PgFlightRepo } from "../adapters/secondaries/repositories/postGres/flights/PgFlightRepo";
import { PgPilotRepo } from "../adapters/secondaries/repositories/postGres/pilots/PgPilotRepo";
import { PgWingRepo } from "../adapters/secondaries/repositories/postGres/wings/PgWingRepo";
import { FlightRepo } from "../domain/gateways/FlightRepo";
import { PilotRepo } from "../domain/gateways/PilotRepo";
import { WingRepo } from "../domain/gateways/WingRepo";
import { ENV, EventBusOption, RepositoriesOption } from "./env";

const shouldNeverBeCalled = (arg: never) => {
  throw new Error("Should never be called");
};

interface Repositories {
  pilot: PilotRepo;
  wing: WingRepo;
  flight: FlightRepo;
}

const getInMemoryRepos = (): Repositories => ({
  pilot: new InMemoryPilotRepo(),
  wing: new InMemoryWingRepo(),
  flight: new InMemoryFlightRepo(),
});

const getPgRepos = (): Repositories => {
  const knex = getKnex(ENV.environment);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  knex.migrate.latest();
  return {
    pilot: new PgPilotRepo(knex),
    wing: new PgWingRepo(knex),
    flight: new PgFlightRepo(knex),
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
