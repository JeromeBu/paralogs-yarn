import { Store } from "redux";
import { HttpAuthGateway } from "./adapters/HttpAuthGateway";
import { HttpFlightGateway } from "./adapters/HttpFlightGateway";
import { HttpWingGateway } from "./adapters/HttpWingGateway";
import { LocalClientStorage } from "./adapters/LocalClientStorage";
import { configureReduxStore, RootState } from "./reduxStore";

export type ReduxStore = Store<RootState>;

export { RootState };

export const store: ReduxStore = configureReduxStore({
  authGateway: new HttpAuthGateway(),
  wingGateway: new HttpWingGateway(),
  flightGateway: new HttpFlightGateway(),
  clientStorage: new LocalClientStorage(),
});
