import { CssBaseline } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { AppRouter } from "./AppRouter";
import { store } from "../store-builder";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};
