import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "./commun/NavBar";
import { FlightListView } from "./views/FlightListView";
import { HomeView } from "./views/HomeView";
import { LoginView } from "./views/LoginView";
import { SignUpView } from "./views/SignUpView";
import { WingsListView } from "./views/WingsListView";
import { wingsActions } from "../../core-logic/useCases/wings/wings.actions";
import { authSelectors } from "../selectors/authSelectors";
import { PrivateRoute } from "./PrivateRoute";
// import { authActions } from "../../core-logic/useCases/auth/auth.actions";

const useUserWings = () => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (isAuthenticated) {
    dispatch(wingsActions.retreiveWingsRequest());
    // }
  }, [isAuthenticated, dispatch]);
};

// const useMe = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(authActions.getMe());
//   });
// };

export const AppRouter: React.FC = () => {
  useUserWings();

  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={HomeView} />
      <PrivateRoute path="/flights" component={FlightListView} />
      <PrivateRoute path="/wings" component={WingsListView} />
      <Route path="/login" component={LoginView} />
      <Route path="/signup" component={SignUpView} />
    </Router>
  );
};
