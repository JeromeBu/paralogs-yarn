import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavBar } from "./commun/NavBar";
import { FlightList } from "./views/FlightList";
import { Home } from "./views/Home";
import { LoginView } from "./views/LoginView";
import { SignUp } from "./views/SignUp";
import { WingsList } from "./views/WingsList";
import { wingsActions } from "../../core-logic/useCases/wings/wings.actions";
import { authSelectors } from "../selectors/authSelectors";
import { PrivateRoute } from "./PrivateRoute";

const useUserWings = () => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // if (isAuthenticated) {
    dispatch(wingsActions.retreiveWingsRequest());
    // }
  }, [isAuthenticated, dispatch]);
};

export const AppRouter: React.FC = () => {
  // useCurrentsession();
  useUserWings();

  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/flights" component={FlightList} />
      <Route path="/wings" component={WingsList} />
      <Route path="/login" component={LoginView} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
};
