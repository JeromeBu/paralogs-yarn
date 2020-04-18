import { Router } from "express";
import { sendHttpResponse } from "../../../lib/response-lib";
import { retrieveWingsController } from "../../controllers/retrieveWingsController";
import { addWingController } from "../../controllers/addWing.controller";

export const wingRouter = Router();

export const wingsRoute = "/wings";

wingRouter
  .route(wingsRoute)
  .get(async (req, res) =>
    sendHttpResponse(res, await retrieveWingsController(req.currentUser)),
  )
  .post(async (req, res) =>
    sendHttpResponse(res, await addWingController(req.body, req.currentUser)),
  );
