import { Router } from "express";
import { sendControllerResponse } from "../../../lib/response-lib";
import { listWingsController } from "../../controllers/listWingscontroller";

export const wingRouter = Router();

wingRouter
  .route("/wings")
  .get(async (req, res) =>
    sendControllerResponse(res, await listWingsController(req.currentUser)),
  );
