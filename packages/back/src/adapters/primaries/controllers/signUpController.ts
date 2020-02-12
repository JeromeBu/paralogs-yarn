import { signUpSchema, ActualUuidGenerator } from "@paralogs/shared";
import { success, failure, HttpResponse } from "../../lib/response-lib";
import { signUpUseCaseCreator } from "../../../domain/useCases/auth/SignUpUseCase";
import { ProductionHashAndTokenManager } from "../../secondaries/ProductionHashAndTokenManager";
import { repositories } from "../../secondaries/repositories";

const signUpUseCase = signUpUseCaseCreator({
  userRepo: repositories.user,
  uuidGenerator: new ActualUuidGenerator(),
  hashAndTokenManager: new ProductionHashAndTokenManager(),
});

export const signUpController = async (body: object): Promise<HttpResponse> => {
  try {
    const signUpParams = await signUpSchema.validate(body, { abortEarly: false });

    return (await signUpUseCase(signUpParams))
      .map(currentUserWithToken => {
        return success(currentUserWithToken);
      })
      .getOrElse(error => {
        return failure(error, 400);
      });
  } catch (error) {
    return failure(error.errors ?? error, 400);
  }
};
