import {
  createInMemoryEventBus,
  EventBus,
  RedisEventBus,
} from "@paralogs/back-shared";

import { createPgWingQueries } from "../adapters/secondaries/queries/PgWingQueries";
import { InMemoryFlightRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";
import { InMemoryPilotRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryPilotRepo";
import { InMemoryWingRepo } from "../adapters/secondaries/repositories/inMemory/InMemoryWingRepo";
import { getKnex } from "../adapters/secondaries/repositories/postGres/db";
import { PgFlightRepo } from "../adapters/secondaries/repositories/postGres/flights/PgFlightRepo";
import { PgPilotRepo } from "../adapters/secondaries/repositories/postGres/pilots/PgPilotRepo";
import { PgWingRepo } from "../adapters/secondaries/repositories/postGres/wings/PgWingRepo";
import { WingQueries } from "../domain/reads/gateways/WingQueries";
import { FlightRepo } from "../domain/writes/gateways/FlightRepo";
import { PilotRepo } from "../domain/writes/gateways/PilotRepo";
import { WingRepo } from "../domain/writes/gateways/WingRepo";
import { wingMapper } from "../domain/writes/mappers/wing.mapper";
import { ENV, EventBusOption, RepositoriesOption } from "./env";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shouldNeverBeCalled = (arg: never) => {
  throw new Error("Should never be called");
};

interface Repositories {
  pilot: PilotRepo;
  wing: WingRepo;
  flight: FlightRepo;
}

interface Queries {
  wing: WingQueries;
}

interface Persistence {
  repositories: Repositories;
  queries: Queries;
}

const getInMemoryPersistence = (): Persistence => {
  const wingRepo = new InMemoryWingRepo();
  return {
    queries: {
      wing: {
        findByPilotUuid: async (pilotUuid) =>
          wingRepo.wings
            .filter((wing) => wing.pilotUuid === pilotUuid)
            .map(wingMapper.entityToDTO),
      },
    },
    repositories: {
      pilot: new InMemoryPilotRepo(),
      wing: wingRepo,
      flight: new InMemoryFlightRepo(),
    },
  };
};

const getPgPersistence = (): Persistence => {
  const knex = getKnex(ENV.environment);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  knex.migrate.latest();
  return {
    queries: {
      wing: createPgWingQueries(knex),
    },
    repositories: {
      pilot: new PgPilotRepo(knex),
      wing: new PgWingRepo(knex),
      flight: new PgFlightRepo(knex),
    },
  };
};

const getRepositoriesAndQueries = (
  repositories: RepositoriesOption,
): Persistence => {
  switch (repositories) {
    case "IN_MEMORY":
      return getInMemoryPersistence();
    case "PG":
      return getPgPersistence();
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

export const { repositories, queries } = getRepositoriesAndQueries(
  ENV.repositories,
);

export const eventBus = getEventBus(ENV.eventBus);
