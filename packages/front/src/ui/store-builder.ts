import { Store } from "redux";
import { HttpAuthGateway } from "../core-logic/adapters/HttpAuthGateway";
import { HttpFlightGateway } from "../core-logic/adapters/HttpFlightGateway";
import { HttpWingGateway } from "../core-logic/adapters/HttpWingGateway";
import { LocalClientStorage } from "../core-logic/adapters/LocalClientStorage";
import { configureReduxStore, RootState } from "../core-logic/reduxStore";

export const store: Store<RootState> = configureReduxStore({
  authGateway: new HttpAuthGateway(),
  wingGateway: new HttpWingGateway(),
  flightGateway: new HttpFlightGateway(),
  clientStorage: new LocalClientStorage(),
});
