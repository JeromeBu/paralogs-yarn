import { APIGatewayEvent } from "aws-lambda";
import { Wing, uuid } from "@paralogs/shared";
import { success, failure } from "../lib/response-lib";

export const main = async (event: APIGatewayEvent) => {
  try {
    // eslint-disable-next-line no-console
    console.log({ eventFromJerome: event });
    const wings: Wing[] = [
      {
        id: uuid(),
        brand: "Nova",
        model: "Ion 5",
        flightTimePriorToOwn: 123,
        ownerFrom: new Date().toUTCString(),
      },
    ];
    return success(wings);
  } catch (error) {
    const message = "Error getting wings";
    // eslint-disable-next-line no-console
    console.error(`${message} : `, error);
    return failure({ message });
  }
};
