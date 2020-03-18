import { Router } from "express";
import { sendControllerResponse } from "../../../lib/response-lib";
import { retreiveWingsController } from "../../controllers/retreiveWings.controller";
import { addWingController } from "../../controllers/addWing.controller";

export const wingRouter = Router();

export const wingsRoute = "/wings";

wingRouter
  .route(wingsRoute)
  .get(async (req, res) =>
    sendControllerResponse(res, await retreiveWingsController(req.currentUser)),
  )
  .post(async (req, res) =>
    sendControllerResponse(res, await addWingController(req.body, req.currentUser)),
  );
