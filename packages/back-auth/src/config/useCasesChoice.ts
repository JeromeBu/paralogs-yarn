import { ActualUuidGenerator } from "@paralogs/shared";

import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { getCurrentUserUseCaseCreator } from "../domain/useCases/auth/GetCurrentUser";
import { loginCommandHandlerCreator } from "../domain/useCases/auth/LoginCommandHandler";
import { signUpCommandHandlerCreator } from "../domain/useCases/auth/SignUpCommandHandler";
import { eventBus, repositories } from "./secondaryAdaptersChoice";

const userRepo = repositories.user;
const hashAndTokenManager = new ProductionHashAndTokenManager();
const uuidGenerator = new ActualUuidGenerator();

export const authUseCases = {
  login: loginCommandHandlerCreator({
    userRepo,
    hashAndTokenManager,
  }),
  signUp: signUpCommandHandlerCreator({
    eventBus,
    userRepo,
    hashAndTokenManager,
    uuidGenerator,
  }),
  getMe: getCurrentUserUseCaseCreator({
    userRepo,
  }),
};
