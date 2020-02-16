import { shapeValidator, addFlightSchema } from "@paralogs/shared";
import { addFlightUseCaseCreator } from "../../../domain/useCases/flights/AddFlightUseCase";
import { repositories } from "../../secondaries/repositories";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { failure, success } from "../../lib/response-lib";

const addFlightUseCase = addFlightUseCaseCreator({ flightRepo: repositories.flight });

export const addFlightController = async (body: object, currentUser: UserEntity) => {
  try {
    const addFlightDto = await shapeValidator(addFlightSchema, body);
    return (await addFlightUseCase({ ...addFlightDto, userId: currentUser.id }))
      .map(success)
      .getOrElse(error => {
        return failure(error, 400);
      });
  } catch (error) {
    return failure(error.errors ?? error, 400);
  }
};
