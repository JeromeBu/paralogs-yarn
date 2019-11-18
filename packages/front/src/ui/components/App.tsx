import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
// import { InMemoryAPIGateway } from "../../core-logic/adapters/InMemoryAPIGateway";
import { AwsAPIGateway } from "../../core-logic/adapters/AwsApiGateway";
import { configureReduxStore, RootState } from "../../core-logic/reduxStore";
import { AppRouter } from "./AppRouter";
import { AwsWingGateway } from "../../core-logic/adapters/AwsWingGateway";
import { AwsFlightGateway } from "../../core-logic/adapters/AwsFlightGateway";

export const store: Store<RootState> = configureReduxStore({
  apiGateway: new AwsAPIGateway({ fakeBackend: true, withFixtures: true }),
  wingGateway: new AwsWingGateway(),
  flightGateway: new AwsFlightGateway(),
});

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};
