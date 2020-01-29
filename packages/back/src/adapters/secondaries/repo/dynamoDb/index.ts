import { DynamoDbWingRepo } from "./DynamoDbWingRepo";
import { DynamoDbUserRepo } from "./DynamoDbUserRepo";

export const dynamoDbWingRepo = new DynamoDbWingRepo();
export const dynamoDbUserRepo = new DynamoDbUserRepo();
