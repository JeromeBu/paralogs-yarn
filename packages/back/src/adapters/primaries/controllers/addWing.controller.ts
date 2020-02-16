import { addWingSchema, shapeValidator } from "@paralogs/shared";
import { addWingUseCaseCreator } from "../../../domain/useCases/wings/AddWingUseCase";
import { repositories } from "../../secondaries/repositories";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { success, failure } from "../../lib/response-lib";

const addWingUseCase = addWingUseCaseCreator({
  wingRepo: repositories.wing,
});

export const addWingController = async (body: object, currentUser: UserEntity) => {
  try {
    const addWingDto = await shapeValidator(addWingSchema, body);

    return (await addWingUseCase({ ...addWingDto, userId: currentUser.id }))
      .map(currentUserWithToken => success(currentUserWithToken))
      .getOrElse(error => {
        return failure(error, 400);
      });
  } catch (error) {
    return failure(error.errors ?? error, 400);
  }
};
