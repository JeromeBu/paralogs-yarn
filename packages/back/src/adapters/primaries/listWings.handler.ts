import { noCurrentUser } from "../../domain/core/errors";
import { listWingsUseCaseCreator } from "../../domain/useCases/wings/ListWingsUseCase";
import { failure, success } from "../lib/response-lib";
import { makeUserEntityCreator } from "../../domain/testBuilders/userEntityBuilder";
import { TestHashAndTokenManager } from "../secondaries/TestHashAndTokenManager";
import { repositories } from "../secondaries/repositories";

const listWingsUseCase = listWingsUseCaseCreator(repositories.wing);
const makeUserEntity = makeUserEntityCreator(new TestHashAndTokenManager());

export const main = async () => {
  try {
    const currentUser = await makeUserEntity();
    if (!currentUser) throw noCurrentUser();

    const wingDTOs = await listWingsUseCase(currentUser);
    return success(wingDTOs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error : `, error);
    return failure({ message: error.message }, error.statusCode);
  }
};
