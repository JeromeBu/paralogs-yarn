import { Router } from "express";
import { sendControllerResponse } from "../../../lib/response-lib";
import { addFlightController } from "../../controllers/addFlight.controller";
import { retreiveFlightsController } from "../../controllers/retreiveFlights.controller";

export const flightRouter = Router();

flightRouter
  .route("/flights")
  .post(async (req, res) =>
    sendControllerResponse(res, await addFlightController(req.body, req.currentUser)),
  )
  .get(async (req, res) =>
    sendControllerResponse(res, await retreiveFlightsController(req.currentUser)),
  );
