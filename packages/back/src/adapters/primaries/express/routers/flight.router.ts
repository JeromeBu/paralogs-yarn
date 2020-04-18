import { Router } from "express";
import { sendHttpResponse } from "../../../lib/response-lib";
import { addFlightController } from "../../controllers/addFlight.controller";
import { retrieveFlightsController } from "../../controllers/retrieveFlightsController";

export const flightRouter = Router();

export const flightsRoute = "/flights";

flightRouter
  .route(flightsRoute)
  .post(async (req, res) =>
    sendHttpResponse(res, await addFlightController(req.body, req.currentUser)),
  )
  .get(async (req, res) =>
    sendHttpResponse(res, await retrieveFlightsController(req.currentUser)),
  );
