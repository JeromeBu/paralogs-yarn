import { retreiveWingsUseCaseCreator } from "../../../domain/useCases/wings/RetreiveWingsUseCase";
import { failure, success } from "../../lib/response-lib";
import { repositories } from "../../secondaries/repositories";
import { UserEntity } from "../../../domain/entities/UserEntity";

const retreiveWingsUseCase = retreiveWingsUseCaseCreator(repositories.wing);

export const retreiveWingsController = async (currentUser: UserEntity) => {
  try {
    const wingDTOs = await retreiveWingsUseCase(currentUser);
    return success(wingDTOs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error : `, error);
    return failure({ error: error.message }, error.statusCode);
  }
};
