import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { StateType } from "typesafe-actions";
import { rootReducer } from "./store/root-reducer";
import { AuthGateway } from "./useCases/currentUser/port/AuthGateway";
import { rootEpic } from "./store/root-epic";
import "./aws-amplify";
import { WingGateway } from "./useCases/wings/port/WingGateway";
import { FlightGateway } from "./useCases/flights/port/FlightGateway";

export type RootState = StateType<typeof rootReducer>;

export interface Dependencies {
  authGateway: AuthGateway;
  wingGateway: WingGateway;
  flightGateway: FlightGateway;
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
