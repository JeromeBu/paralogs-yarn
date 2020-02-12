import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { HttpAuthGateway } from "../../core-logic/adapters/HttpAuthGateway";
import { configureReduxStore, RootState } from "../../core-logic/reduxStore";
import { AppRouter } from "./AppRouter";
import { HttpWingGateway } from "../../core-logic/adapters/HttpWingGateway";
import { HttpFlightGateway } from "../../core-logic/adapters/HttpFlightGateway";

export const store: Store<RootState> = configureReduxStore({
  authGateway: new HttpAuthGateway(),
  wingGateway: new HttpWingGateway(),
  flightGateway: new HttpFlightGateway(),
});

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};
