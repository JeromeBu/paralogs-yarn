import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { StateType } from "typesafe-actions";
import { rootReducer } from "./store/root-reducer";
import { APIGateway } from "./useCases/api.gateway";
import { rootEpic } from "./store/root-epic";
import "./aws-amplify";

export type RootState = StateType<typeof rootReducer>;

export interface Dependencies {
  apiGateway: APIGateway;
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
