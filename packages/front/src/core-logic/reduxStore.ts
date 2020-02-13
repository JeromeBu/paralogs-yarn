import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { StateType } from "typesafe-actions";
import { rootReducer } from "./store/root-reducer";
import { AuthGateway } from "./useCases/auth/port/AuthGateway";
import { rootEpic } from "./store/root-epic";
import { WingGateway } from "./useCases/wings/port/WingGateway";
import { FlightGateway } from "./useCases/flights/port/FlightGateway";
import { HttpAuthGateway } from "./adapters/HttpAuthGateway";
import { HttpWingGateway } from "./adapters/HttpWingGateway";
import { HttpFlightGateway } from "./adapters/HttpFlightGateway";
import { LocalClientStorage } from "./adapters/LocalClientStorage";
import { ClientStorage } from "./useCases/auth/port/ClientStorage";

export type RootState = StateType<typeof rootReducer>;

export interface Dependencies {
  authGateway: AuthGateway;
  wingGateway: WingGateway;
  flightGateway: FlightGateway;
  clientStorage: ClientStorage;
}

export const configureReduxStore = (dependencies: Dependencies): Store => {
  const epicMiddleware = createEpicMiddleware({ dependencies });
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );
  epicMiddleware.run(rootEpic);
  return store;
};

export const store: Store<RootState> = configureReduxStore({
  authGateway: new HttpAuthGateway(),
  wingGateway: new HttpWingGateway(),
  flightGateway: new HttpFlightGateway(),
  clientStorage: new LocalClientStorage(),
});
