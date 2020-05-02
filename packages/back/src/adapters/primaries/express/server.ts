import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { authenticateMiddlewareBuilder } from "./authenticate-middleware";
import { repositories } from "../../../config/repositoryChoice";
import { authController } from "../controllers/auth.controller";
import { wingsController } from "../controllers/wings.controller";
import { flightsController } from "../controllers/flights.controller";
import { pilotsController } from "../controllers/pilots.controller";

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(authenticateMiddlewareBuilder(repositories.user));

app.use(authController());
app.use(pilotsController());
app.use(wingsController());
app.use(flightsController());
