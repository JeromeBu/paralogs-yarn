import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { authenticateMiddlewareBuilder } from "./authenticate-middleware";
import { repositories } from "../../../config/repositoryChoice";
import { authController } from "../controllers/auth.controller";

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(authenticateMiddlewareBuilder(repositories.user));

app.use(authController());
