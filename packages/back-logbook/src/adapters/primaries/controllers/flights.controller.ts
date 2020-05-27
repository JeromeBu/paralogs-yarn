import {
  callUseCase,
  RightAsync,
  sendHttpResponse,
  validateSchema,
} from "@paralogs/back-shared";
import { addFlightSchema, flightsRoute } from "@paralogs/shared";
import { Router } from "express";

import { getFlightsUseCases } from "../../../config/useCasesChoice";

export const flightsRouter = Router();

export const flightsController = async () => {
  const flightsUseCases = await getFlightsUseCases();
  flightsRouter
    .route(flightsRoute)
    .post(async (req, res) => {
      const resultAddFlightBody = await validateSchema(
        addFlightSchema,
        req.body,
      );
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: flightsUseCases.addFlight,
          eitherAsyncParams: resultAddFlightBody.map((addFlightBody) => ({
            ...addFlightBody,
            pilotUuid: req.currentUserUuid,
          })),
        }),
      );
    })
    .get(async (req, res) => {
      return sendHttpResponse(
        res,
        await callUseCase({
          useCase: flightsUseCases.retrieveFlights,
          eitherAsyncParams: RightAsync(req.currentUserUuid),
        }),
      );
    });

  return flightsRouter;
};
