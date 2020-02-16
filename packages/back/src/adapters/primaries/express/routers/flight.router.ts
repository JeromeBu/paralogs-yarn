import { Router } from "express";
import { sendControllerResponse } from "../../../lib/response-lib";
import { addFlightController } from "../../controllers/addFlight.controller";

export const flightRouter = Router();

flightRouter
  .route("/flights")
  .post(async (req, res) =>
    sendControllerResponse(res, await addFlightController(req.body, req.currentUser)),
  );
