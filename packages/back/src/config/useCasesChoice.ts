import { repositories } from "./repositoryChoice";
import { addWingCommandHandlerCreator } from "../domain/useCases/wings/AddWingCommandHandler";
import { retrieveWingsUseCaseCreator } from "../domain/useCases/wings/RetrieveWingsUseCase";
import { addFlightCommandHandlerCreator } from "../domain/useCases/flights/AddFlightCommandHandler";
import { retrieveFlightsUseCaseCreator } from "../domain/useCases/flights/RetrieveFlightsUseCase";
import { updatePilotCommandHandlerCreator } from "../domain/useCases/pilots/UpdatePilotCommandHandler";
import { updateWingCommandHandlerCreator } from "../domain/useCases/wings/UpdateWingCommandHandler";
import { createPilotCommandHandlerCreator } from "../domain/useCases/pilots/CreatePilotCommandHandler";

export const pilotsUseCases = {
  create: createPilotCommandHandlerCreator({ pilotRepo: repositories.pilot }),
  update: updatePilotCommandHandlerCreator({ pilotRepo: repositories.pilot }),
};

export const wingsUseCases = {
  addWing: addWingCommandHandlerCreator({ wingRepo: repositories.wing }),
  retrieveWings: retrieveWingsUseCaseCreator(repositories.wing),
  updateWing: updateWingCommandHandlerCreator({ wingRepo: repositories.wing }),
};

export const flightsUseCases = {
  addFlight: addFlightCommandHandlerCreator({ flightRepo: repositories.flight }),
  retrieveFlights: retrieveFlightsUseCaseCreator({ flightRepo: repositories.flight }),
};
