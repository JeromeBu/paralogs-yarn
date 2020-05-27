import { createAuthenticateMiddleware } from "@paralogs/back-shared/dist/src/createAuthenticateMiddleware";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { ENV } from "../../../config/env";
import { eventBus } from "../../../config/secondaryAdaptersChoice";
import { flightsController } from "../controllers/flights.controller";
import { subscribeToEvents } from "../controllers/pilots.subscribers";
import { wingsController } from "../controllers/wings.controller";

export const getApp = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.use(createAuthenticateMiddleware(ENV.jwtSecret));

  app.use(await wingsController());
  app.use(await flightsController());

  await subscribeToEvents(eventBus);
  return app;
};
