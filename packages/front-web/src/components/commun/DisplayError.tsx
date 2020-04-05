import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

interface DisplayErrorProps {
  error?: Error;
}

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
}));

export const DisplayError: React.FC<DisplayErrorProps> = ({ error }) => {
  const classes = useStyles();

  if (!error) return null;
  return (
    <Typography variant="body1" className={classes.error}>
      {error.message ? error.message : error}
    </Typography>
  );
};
