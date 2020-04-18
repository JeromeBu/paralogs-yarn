import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { authenticateMiddlewareBuilder } from "./authenticate-middleware";
import { repositories } from "../../secondaries/repositories/repositoryChoice";
import { flightRouter } from "./routers/flight.router";
import { getAuthRouter } from "../controllers/auth.controller";
import { getWingsRouter } from "../controllers/wings.controller";

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(authenticateMiddlewareBuilder(repositories.user));

app.use(getAuthRouter());
app.use(getWingsRouter());
app.use(flightRouter);
