import {
  AppBar,
  Button,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { MyLink } from "./MyLink";
import { RootState } from "../../../core-logic/reduxStore";
import { currentUserActions } from "../../../core-logic/useCases/currentUser/currentUser.actions";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAutenticated = useSelector(
    ({ currentUser }: RootState) => currentUser.isAuthenticated,
  );

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <MyLink to="flights">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </MyLink>
        <Typography variant="h6" className={classes.title}>
          Paralogs
        </Typography>
        {isAutenticated ? (
          <Button color="inherit" onClick={() => dispatch(currentUserActions.loggout())}>
            Logout
          </Button>
        ) : (
          <MyLink to="login">
            <Button color="inherit">Login</Button>
          </MyLink>
        )}
      </Toolbar>
    </AppBar>
  );
};
