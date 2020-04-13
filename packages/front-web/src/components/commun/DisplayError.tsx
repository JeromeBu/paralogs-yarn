import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

interface DisplayErrorProps {
  errorMessage?: string;
}

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
}));

export const DisplayError: React.FC<DisplayErrorProps> = ({ errorMessage }) => {
  const classes = useStyles();

  if (!errorMessage) return null;
  return (
    <Typography variant="body1" className={classes.error}>
      {errorMessage}
    </Typography>
  );
};
