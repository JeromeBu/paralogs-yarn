import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { authController } from "../controllers/auth.controller";
import { authenticateMiddleware } from "./authenticate-middleware";

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(authenticateMiddleware);

app.use(authController());
