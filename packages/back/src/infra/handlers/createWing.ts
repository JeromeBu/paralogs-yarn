import { APIGatewayEvent } from "aws-lambda";
import { Wing } from "@paralogs/shared";
import { CreateWingUseCase } from "../../domain/useCases/CreateWingUseCase";
import { inMemoryWingRepo } from "../repo/InMemory.main";
import { noBodyProvided } from "../../domain/core/errors";
import { success } from "../lib/response-lib";

const creatWingUseCase = new CreateWingUseCase(inMemoryWingRepo);

export const main = async (event: APIGatewayEvent) => {
  if (!event.body) throw noBodyProvided("Wing");
  const wing = JSON.parse(event.body) as Wing;

  // eslint-disable-next-line no-console
  console.log("CREATE :  ", { body: event.body, wing });

  await creatWingUseCase.execute(wing);

  // eslint-disable-next-line no-console
  console.log("Wing created");

  return success(wing);
};
