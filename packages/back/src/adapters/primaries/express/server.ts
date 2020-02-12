import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { wingRouter } from "./routers/wing.router";
import { authRouter } from "./routers/auth.router";
import { authenticateMiddlewareBuilder } from "./authenticate-middleware";
import { repositories } from "../../secondaries/repositories";

const app = express();

const port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use(authenticateMiddlewareBuilder(repositories.user));

app.use(wingRouter);
app.use(authRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`--- App is running on port: ${port} ---`));
