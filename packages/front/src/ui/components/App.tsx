import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
// import { InMemoryAPIGateway } from "../../core-logic/adapters/InMemoryAPIGateway";
import { AwsAPIGateway } from "../../core-logic/adapters/AwsApiGateway";
import { configureReduxStore, RootState } from "../../core-logic/reduxStore";
import { AppRouter } from "./AppRouter";

// const apiGateway = new InMemoryAPIGateway({ fakeBackend: true, withFixtures: true });
const apiGateway = new AwsAPIGateway({ fakeBackend: true, withFixtures: true });
export const store: Store<RootState> = configureReduxStore({ apiGateway });

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};
