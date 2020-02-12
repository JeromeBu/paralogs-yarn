import { listWingsUseCaseCreator } from "../../../domain/useCases/wings/ListWingsUseCase";
import { failure, success } from "../../lib/response-lib";
import { repositories } from "../../secondaries/repositories";
import { UserEntity } from "../../../domain/entities/UserEntity";

const listWingsUseCase = listWingsUseCaseCreator(repositories.wing);

export const listWingsController = async (currentUser: UserEntity) => {
  try {
    const wingDTOs = await listWingsUseCase(currentUser);
    return success(wingDTOs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error : `, error);
    return failure({ error: error.message }, error.statusCode);
  }
};
