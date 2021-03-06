import { expectEitherToMatchError } from "@paralogs/back-shared";
import {
  FlightDTO,
  FlightUuid,
  generateUuid,
  makeFlightDTO,
} from "@paralogs/shared";

import { InMemoryFlightRepo } from "../../../../adapters/secondaries/persistence/inMemory/InMemoryFlightRepo";
import { flightMapper } from "../../mappers/flight.mapper";
import {
  AddFlightCommandHandler,
  addFlightCommandHandlerCreator,
} from "./AddFlightCommandHandler";

describe("add a flight", () => {
  let addFlightUseCase: AddFlightCommandHandler;
  let flightRepo: InMemoryFlightRepo;

  beforeEach(() => {
    flightRepo = new InMemoryFlightRepo();
    addFlightUseCase = addFlightCommandHandlerCreator({ flightRepo });
  });

  describe("a flight already exists with the same identity", () => {
    it("cannot create a flight", async () => {
      const id: FlightUuid = generateUuid();
      const flightDto = makeFlightDTO({ uuid: id });
      await addFlightUseCase(flightDto).run();

      const flightDtoWithSameId = makeFlightDTO({
        uuid: id,
        site: "The new one",
      });
      const result = await addFlightUseCase(flightDtoWithSameId).run();
      expectEitherToMatchError(result, "A flight with this id already exists");
    });
  });

  describe("all is good", () => {
    it("creates a flight", async () => {
      const uuid: FlightUuid = generateUuid();
      const flightDto = makeFlightDTO({ uuid });
      await addFlightUseCase(flightDto).run();
      expectFlightDtoToBeSaved(flightDto);
    });
  });

  const expectFlightDtoToBeSaved = (flightDTO: FlightDTO) => {
    const flightFound = flightRepo.flights.find(
      ({ uuid }) => uuid === flightDTO.uuid,
    )!;
    expect(flightFound).toBeTruthy();
    expect(flightMapper.entityToDTO(flightFound)).toEqual(flightDTO);
  };
});
