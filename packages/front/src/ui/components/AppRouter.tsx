import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { SignUp } from "./views/SignUp";
import { FlightList } from "./views/FlightList";
import { NavBar } from "./commun/NavBar";
import { currentUserActions } from "../../core-logic/useCases/currentUser/currentUser.actions";

const useFetchCurrentSession = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(currentUserActions.getCurrentSession());
  }, [dispatch]);
};

export const AppRouter: React.FC = () => {
  useFetchCurrentSession();

  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/flights" component={FlightList} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
};
