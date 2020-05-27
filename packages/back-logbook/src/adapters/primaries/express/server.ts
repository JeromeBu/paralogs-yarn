import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { eventBus } from "../../../config/secondaryAdaptersChoice";
import { flightsController } from "../controllers/flights.controller";
import { subscribeToEvents } from "../controllers/pilots.subscribers";
import { wingsController } from "../controllers/wings.controller";
import { authenticateMiddleware } from "./authenticate-middleware";

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(authenticateMiddleware);

app.use(wingsController());
app.use(flightsController());

subscribeToEvents(eventBus);
