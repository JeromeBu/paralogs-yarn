import { ActualUuidGenerator } from "@paralogs/shared";
import { createInMemoryEventBus } from "@paralogs/back-shared";
import { loginCommandHandlerCreator } from "../domain/useCases/auth/LoginCommandHandler";
import { repositories } from "./repositoryChoice";
import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { signUpCommandHandlerCreator } from "../domain/useCases/auth/SignUpCommandHandler";

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
};
