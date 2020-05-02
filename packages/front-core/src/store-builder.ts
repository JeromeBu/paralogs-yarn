import { Store } from "redux";
import { HttpAuthGateway } from "./adapters/HttpAuthGateway";
import { HttpFlightGateway } from "./adapters/HttpFlightGateway";
import { HttpWingGateway } from "./adapters/HttpWingGateway";
import { LocalClientStorage } from "./adapters/LocalClientStorage";
import { configureReduxStore, RootState as _RootState } from "./reduxStore";
import { HttpPilotGateway } from "./adapters/HttpPilotGateway";

export type ReduxStore = Store<_RootState>;

export type RootState = _RootState;

export const store: ReduxStore = configureReduxStore({
  authGateway: new HttpAuthGateway(),
  wingGateway: new HttpWingGateway(),
  flightGateway: new HttpFlightGateway(),
  pilotGateway: new HttpPilotGateway(),
  clientStorage: new LocalClientStorage(),
});
