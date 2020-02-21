import React from "react";
import { Container, Fab, List, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";

import { AddFlightDTO } from "@paralogs/shared";

import { RootState } from "../../../core-logic/reduxStore";
import { flightActions } from "../../../core-logic/useCases/flights/flights.actions";

import { roundButtonStyle } from "../commun/styles";
import { AddFlightModal } from "../flight/AddFlightModal";
import { AddWingModal } from "../wing/AddWingModal";
import { FlightListItem } from "../flight/FlightListItem";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  listWrapper: {
    width: "100%",
  },
  ...roundButtonStyle(theme),
}));

export const FlightsListView: React.FC = () => {
  const classes = useStyles();
  const isAddFlightFormVisible = useSelector(
    ({ flights }: RootState) => flights.isAddFlightFormVisible,
  );
  const flights = useSelector((state: RootState) => state.flights.data);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm" className={classes.paper}>
      <Typography variant="h5">
        Your flights
        {!isAddFlightFormVisible && (
          <Fab
            color="primary"
            className={classes.roundButton}
            onClick={() => dispatch(flightActions.showAddFlightForm())}
          >
            <AddIcon />
          </Fab>
        )}
      </Typography>

      <AddFlightModal
        close={() => dispatch(flightActions.hideAddFlightForm())}
        isOpen={isAddFlightFormVisible}
        handleSubmit={async (addFlightDto: AddFlightDTO) => {
          await dispatch(flightActions.addFlightRequest(addFlightDto));
        }}
      />
      <AddWingModal />
      <List className={classes.listWrapper}>
        {flights.map(flight => (
          <FlightListItem key={flight.id} {...flight} />
        ))}
      </List>
    </Container>
  );
};
