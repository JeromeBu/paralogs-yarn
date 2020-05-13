import { createInMemoryEventBus } from "@paralogs/back-shared";
import { ActualUuidGenerator } from "@paralogs/shared";

import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { getMeUseCaseCreator } from "../domain/useCases/auth/GetMeUseCase";
import { loginCommandHandlerCreator } from "../domain/useCases/auth/LoginCommandHandler";
import { signUpCommandHandlerCreator } from "../domain/useCases/auth/SignUpCommandHandler";
import { repositories } from "./repositoryChoice";

const userRepo = repositories.user;
const hashAndTokenManager = new ProductionHashAndTokenManager();
const uuidGenerator = new ActualUuidGenerator();

const eventBus = createInMemoryEventBus({ getNow: () => new Date() });

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
  getMe: getMeUseCaseCreator({
    userRepo,
  }),
};
