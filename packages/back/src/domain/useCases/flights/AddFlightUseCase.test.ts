import {
  FlightUuid,
  generateUuid,
  makeFlightDTO,
  FlightDTO,
  Result,
} from "@paralogs/shared";
import { AddFlightUseCase, addFlightUseCaseCreator } from "./AddFlightUseCase";
import { InMemoryFlightRepo } from "../../../adapters/secondaries/repositories/inMemory/InMemoryFlightRepo";

describe("add a flight", () => {
  let addFlightUseCase: AddFlightUseCase;
  let flightRepo: InMemoryFlightRepo;

  beforeEach(() => {
    flightRepo = new InMemoryFlightRepo();
    addFlightUseCase = addFlightUseCaseCreator({ flightRepo });
  });

  describe("a flight already exists with the same identity", () => {
    it("cannot create a flight", async () => {
      const id: FlightUuid = generateUuid();
      const flightDto = makeFlightDTO({ uuid: id });
      await addFlightUseCase(flightDto);

      const flightDtoWithSameId = makeFlightDTO({ uuid: id, site: "The new one" });
      const result = await addFlightUseCase(flightDtoWithSameId);

      expect(result.error).toBe("A flight with this id already exists");
    });
  });

  describe("all is good", () => {
    it("creates a flight", async () => {
      const id: FlightUuid = generateUuid();
      const flightDto = makeFlightDTO({ uuid: id });
      const createdFlight = await addFlightUseCase(flightDto);
      expectFlightDtoResultToEqual(createdFlight, flightDto);
      await expectRepoToHaveFlight(id);
    });
  });

  const expectFlightDtoResultToEqual = (
    result: Result<FlightDTO>,
    expected: FlightDTO,
  ) => {
    result
      .map(createdFlightDTO => expect(createdFlightDTO).toEqual(expected))
      .getOrThrow();
  };

  const expectRepoToHaveFlight = async (flightId: FlightUuid) => {
    expect(flightRepo.flights.map(({ uuid }) => uuid)).toContain(flightId);
    // expect(await flightRepo.findById(flightId)).toBeDefined();
  };
});
