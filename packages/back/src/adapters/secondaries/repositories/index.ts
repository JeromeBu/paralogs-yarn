import { InMemoryWingRepo } from "./inMemory/InMemoryWingRepo";
import { InMemoryUserRepo } from "./inMemory/InMemoryUserRepo";
import { UserRepo } from "../../../domain/port/UserRepo";
import { WingRepo } from "../../../domain/port/WingRepo";
import { DynamoDbUserRepo } from "./dynamoDb/DynamoDbUserRepo";
import { DynamoDbWingRepo } from "./dynamoDb/DynamoDbWingRepo";

interface Repositories {
  user: UserRepo;
  wing: WingRepo;
}

const inMemoryRepos: Repositories = {
  user: new InMemoryUserRepo(),
  wing: new InMemoryWingRepo(),
};

const dynamoDbRepos: Repositories = {
  user: new DynamoDbUserRepo(),
  wing: new DynamoDbWingRepo(),
};

// eslint-disable-next-line no-console
if (process.env.IN_MEMORY_REPO) console.log("Repositories are IN MEMORY");

export const repositories = process.env.IN_MEMORY_REPO ? inMemoryRepos : dynamoDbRepos;
