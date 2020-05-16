import { configureStore, getDefaultMiddleware, Store } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";

import { rootEpic } from "./store/root-epic";
import { rootReducer } from "./store/root-reducer";
import { AuthGateway } from "./useCases/auth/gateways/AuthGateway";
import { ClientStorage } from "./useCases/auth/gateways/ClientStorage";
import { FlightGateway } from "./useCases/flights/gateways/FlightGateway";
import { PilotGateway } from "./useCases/pilot/gateways/PilotGateway";
import { WingGateway } from "./useCases/wings/gateways/WingGateway";

export type RootState = ReturnType<typeof rootReducer>;

export interface Dependencies {
  authGateway: AuthGateway;
  wingGateway: WingGateway;
  flightGateway: FlightGateway;
  pilotGateway: PilotGateway;
  clientStorage: ClientStorage;
}

export const configureReduxStore = (dependencies: Dependencies): Store => {
  const epicMiddleware = createEpicMiddleware({ dependencies });
  const token = dependencies.clientStorage.get("token");

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), epicMiddleware],
    preloadedState: {
      auth: {
        isLoading: false,
        currentUser: null,
        token,
      },
    },
  });
  epicMiddleware.run(rootEpic);
  return store;
};
