import { UserEntity } from "../../../domain/entities/UserEntity";
import { success, failure } from "../../lib/response-lib";
import { retreiveFlightsUseCaseCreator } from "../../../domain/useCases/flights/RetreiveFlightsUseCase";
import { repositories } from "../../secondaries/repositories";

const retreiveFlightsUseCase = retreiveFlightsUseCaseCreator({
  flightRepo: repositories.flight,
});

export const retreiveFlightsController = async (currentUser: UserEntity) => {
  try {
    const flightDTOs = await retreiveFlightsUseCase(currentUser);
    return success(flightDTOs);
  } catch (error) {
    return failure({ error: error.message }, error.statusCode);
  }
};
