import React, { useEffect } from "react";
import { Container, Fab, List, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";

import { Wing } from "@paralogs/shared";

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

export const WingsList: React.FC = () => {
  const classes = useStyles();
  const isAddWingFormVisible = useSelector(
    ({ wings }: RootState) => wings.isAddWingFormVisible,
  );
  const wings = useSelector((state: RootState) => state.wings.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(flightActions.retreiveFlightsRequest());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" className={classes.paper}>
      <Typography component="h1" variant="h5">
        Your wings
        {!isAddWingFormVisible && (
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
        isOpen={isAddWingFormVisible}
        handleSubmit={async (wing: Wing) => {
          await dispatch(flightActions.addFlightRequest(wing));
        }}
      />
      <AddWingModal
        handleSubmit={async wing => {
          // eslint-disable-next-line no-console
          console.log("TODO: send to backend", { wing });
        }}
      />
      <List className={classes.listWrapper}>
        {wings.map(flight => (
          <FlightListItem key={flight.id} {...flight} />
        ))}
      </List>
    </Container>
  );
};
