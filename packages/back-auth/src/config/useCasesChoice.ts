import { ActualUuidGenerator } from "@paralogs/shared";

import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { getCurrentUserReadCreator } from "../domain/reads/GetCurrentUserRead";
import { loginReadCreator } from "../domain/reads/LoginRead";
import { signUpCommandHandlerCreator } from "../domain/writes/commandHandlers/SignUpCommandHandler";
import { eventBus, queries, repositories } from "./secondaryAdaptersChoice";

const userRepo = repositories.user;
const userQueries = queries.user;
const hashAndTokenManager = new ProductionHashAndTokenManager();
const uuidGenerator = new ActualUuidGenerator();

export const authUseCases = {
  login: loginReadCreator({
    userRepo,
    hashAndTokenManager,
  }),
  signUp: signUpCommandHandlerCreator({
    eventBus,
    userRepo,
    hashAndTokenManager,
    uuidGenerator,
  }),
  getMe: getCurrentUserReadCreator({
    userQueries,
  }),
};
