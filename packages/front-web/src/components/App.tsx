import { CssBaseline } from "@material-ui/core";
import { store } from "@paralogs/front-core";
import React from "react";
import { Provider } from "react-redux";

import { AppRouter } from "./AppRouter";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};
