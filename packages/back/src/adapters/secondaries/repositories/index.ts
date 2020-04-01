import { InMemoryWingRepo } from "./inMemory/InMemoryWingRepo";
import { createInMemoryUserRepo } from "./inMemory/InMemoryUserRepo";
import { UserRepo } from "../../../domain/port/UserRepo";
import { WingRepo } from "../../../domain/port/WingRepo";
import { FlightRepo } from "../../../domain/port/FlightRepo";
import { InMemoryFlightRepo } from "./inMemory/InMemoryFlightRepo";

interface Repositories {
  user: UserRepo;
  wing: WingRepo;
  flight: FlightRepo;
}

const inMemoryRepos: Repositories = {
  user: createInMemoryUserRepo(),
  wing: new InMemoryWingRepo(),
  flight: new InMemoryFlightRepo(),
};

// const dynamoDbRepos: Repositories = {
//   user: new DynamoDbUserRepo(),
//   wing: new DynamoDbWingRepo(),
// };

// eslint-disable-next-line no-console
console.log(
  "Repositories are : ",
  process.env.IN_MEMORY_REPOS ? "IN MEMORY" : "IN MEMORY",
);

export const repositories = process.env.IN_MEMORY_REPOS ? inMemoryRepos : inMemoryRepos;
