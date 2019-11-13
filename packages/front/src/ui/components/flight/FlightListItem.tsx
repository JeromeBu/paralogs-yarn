import React from "react";
import {
  ListItem,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { format } from "date-fns";

import { Flight } from "@paralogs/shared";

import { formatDuration } from "../../formatDuration";

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[300]}`,
    width: "100%",
  },
}));

export const FlightListItem: React.FC<Flight> = ({ site, date, duration, time }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.wrapper} button dense>
      <ListItemText
        primary={site}
        secondary={`${format(new Date(date), "dd/MM/yyyy")} ${time}`}
      />
      <ListItemSecondaryAction>{formatDuration(duration)}</ListItemSecondaryAction>
    </ListItem>
  );
};
