import { FlightRepo } from "../../port/FlightRepo";
import { UserEntity } from "../../entities/UserEntity";
import { flightMapper } from "../../mappers/flight.mapper";

interface RetrieveFlightsDependencies {
  flightRepo: FlightRepo;
}

export const retreiveFlightsUseCaseCreator = ({
  flightRepo,
}: RetrieveFlightsDependencies) => async (currentUser: UserEntity) => {
  return (await flightRepo.findByUserId(currentUser.id)).map(flightMapper.entityToDTO);
};

export type RetrieveFlightsUseCase = ReturnType<typeof retreiveFlightsUseCaseCreator>;
