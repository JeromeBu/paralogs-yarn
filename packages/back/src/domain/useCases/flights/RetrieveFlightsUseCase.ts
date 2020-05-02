import { Result } from "@paralogs/shared";
import { FlightRepo } from "../../gateways/FlightRepo";
import { UserEntity } from "../../entities/UserEntity";
import { flightMapper } from "../../mappers/flight.mapper";

interface RetrieveFlightsDependencies {
  flightRepo: FlightRepo;
}

export const retrieveFlightsUseCaseCreator = ({
  flightRepo,
}: RetrieveFlightsDependencies) => async (currentUser: UserEntity) => {
  return Result.ok(
    (await flightRepo.findByUserId(currentUser.uuid)).map(flightMapper.entityToDTO),
  );
};

export type RetrieveFlightsUseCase = ReturnType<typeof retrieveFlightsUseCaseCreator>;
