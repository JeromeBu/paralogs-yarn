import { FlightDTO } from "@paralogs/shared";
import { FlightRepo } from "../../port/FlightRepo";
import { Result } from "../../core/Result";
import { FlightEntity } from "../../entities/FlightEntity";
import { flightMapper } from "../../mappers/flight.mapper";

export const addFlightUseCaseCreator = (flightRepo: FlightRepo) => async (
  flightDto: FlightDTO,
): Promise<Result<FlightDTO>> => {
  const existingFlightEntity = await flightRepo.findById(flightDto.id);
  if (existingFlightEntity) return Result.fail("A flight with this id already exists");
  return FlightEntity.create(flightDto).mapAsync(async flightEntity => {
    await flightRepo.save(flightEntity);
    return flightMapper.entityToDTO(flightEntity);
  });
};

export type AddFlightUseCase = ReturnType<typeof addFlightUseCaseCreator>;
