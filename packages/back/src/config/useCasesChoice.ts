import { ActualUuidGenerator } from "@paralogs/shared";
import { loginCommandHandlerCreator } from "../domain/useCases/auth/LoginCommandHandler";
import { repositories } from "./repositoryChoice";
import { ProductionHashAndTokenManager } from "../adapters/secondaries/ProductionHashAndTokenManager";
import { signUpCommandHandlerCreator } from "../domain/useCases/auth/SignUpCommandHandler";
import { addWingCommandHandlerCreator } from "../domain/useCases/wings/AddWingCommandHandler";
import { retrieveWingsUseCaseCreator } from "../domain/useCases/wings/RetrieveWingsUseCase";
import { addFlightCommandHandlerCreator } from "../domain/useCases/flights/AddFlightCommandHandler";
import { retrieveFlightsUseCaseCreator } from "../domain/useCases/flights/RetrieveFlightsUseCase";
import { updateUserCommandHandlerCreator } from "../domain/useCases/users/UpdateUserCommandHandler";
import { updateWingCommandHandlerCreator } from "../domain/useCases/wings/UpdateWingCommandHandler";

const userRepo = repositories.user;
const hashAndTokenManager = new ProductionHashAndTokenManager();
const uuidGenerator = new ActualUuidGenerator();

export const authUseCases = {
  login: loginCommandHandlerCreator({
    userRepo,
    hashAndTokenManager,
  }),
  signUp: signUpCommandHandlerCreator({
    userRepo,
    hashAndTokenManager,
    uuidGenerator,
  }),
};

export const userUseCases = {
  update: updateUserCommandHandlerCreator({
    userRepo,
  }),
};

export const wingsUseCases = {
  addWing: addWingCommandHandlerCreator({
    wingRepo: repositories.wing,
  }),
  retrieveWings: retrieveWingsUseCaseCreator(repositories.wing),
  updateWing: updateWingCommandHandlerCreator({ wingRepo: repositories.wing }),
};

export const flightsUseCases = {
  addFlight: addFlightCommandHandlerCreator({ flightRepo: repositories.flight }),
  retrieveFlights: retrieveFlightsUseCaseCreator({
    flightRepo: repositories.flight,
  }),
};
