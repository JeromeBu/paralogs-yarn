import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { authActions } from "@paralogs/front-core";
import { NavBar } from "./commun/NavBar";
import { FlightsListView } from "./views/FlightsListView";
import { HomeView } from "./views/HomeView";
import { LoginView } from "./views/LoginView";
import { SignUpView } from "./views/SignUpView";
import { WingsListView } from "./views/WingsListView";
import { authSelectors } from "../selectors/authSelectors";
import { PrivateRoute } from "./PrivateRoute";

const useRetrieveUserData = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) dispatch(authActions.getMe());
  }, [isAuthenticated]);
};

export const AppRouter: React.FC = () => {
  useRetrieveUserData();

  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={HomeView} />
      <PrivateRoute path="/flights" component={FlightsListView} />
      <PrivateRoute path="/wings" component={WingsListView} />
      <Route path="/login" component={LoginView} />
      <Route path="/signup" component={SignUpView} />
    </Router>
  );
};
