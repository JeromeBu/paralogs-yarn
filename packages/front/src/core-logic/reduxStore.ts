import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { StateType } from "typesafe-actions";
import { rootEpic } from "./store/root-epic";
import { rootReducer } from "./store/root-reducer";
import { AuthGateway } from "./useCases/auth/port/AuthGateway";
import { ClientStorage } from "./useCases/auth/port/ClientStorage";
import { FlightGateway } from "./useCases/flights/port/FlightGateway";
import { WingGateway } from "./useCases/wings/port/WingGateway";

export type RootState = StateType<typeof rootReducer>;

export interface Dependencies {
  authGateway: AuthGateway;
  wingGateway: WingGateway;
  flightGateway: FlightGateway;
  clientStorage: ClientStorage;
}

export const configureReduxStore = (dependencies: Dependencies): Store => {
  const epicMiddleware = createEpicMiddleware({ dependencies });
  const token = dependencies.clientStorage.get("token");

  const store = createStore(
    rootReducer,
    {
      auth: {
        isLoading: false,
        currentUser: null,
        token,
      },
    },
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );
  epicMiddleware.run(rootEpic);
  return store;
};
