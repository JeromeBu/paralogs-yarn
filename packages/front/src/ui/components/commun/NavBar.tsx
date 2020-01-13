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
import { authSelectors } from "../../selectors/authSelectors";
import { authActions } from "../../../core-logic/useCases/auth/auth.actions";

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
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

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
        {isAuthenticated ? (
          <Button color="inherit" onClick={() => dispatch(authActions.logout())}>
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
