import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { currentUserActions } from "../../core-logic/useCases/currentUser/currentUser.actions";
import { NavBar } from "./commun/NavBar";
import { FlightList } from "./views/FlightList";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { SignUp } from "./views/SignUp";
import { WingsList } from "./views/WingsList";
import { wingsActions } from "../../core-logic/useCases/wings/wings.actions";
import { RootState } from "../../core-logic/reduxStore";

const useCurrentsession = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(currentUserActions.getCurrentSession());
  }, [dispatch]);
};

const useUserWings = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.currentUser.isAuthenticated,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(wingsActions.retreiveWingsRequest());
    }
  }, [isAuthenticated, dispatch]);
};

export const AppRouter: React.FC = () => {
  useCurrentsession();
  useUserWings();

  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/flights" component={FlightList} />
      <Route path="/wings" component={WingsList} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
};
