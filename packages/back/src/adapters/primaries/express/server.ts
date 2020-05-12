import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { authenticateMiddleware } from "./authenticate-middleware";
import { wingsController } from "../controllers/wings.controller";
import { flightsController } from "../controllers/flights.controller";
import { pilotsController } from "../controllers/pilots.controller";

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(authenticateMiddleware);

app.use(pilotsController());
app.use(wingsController());
app.use(flightsController());
