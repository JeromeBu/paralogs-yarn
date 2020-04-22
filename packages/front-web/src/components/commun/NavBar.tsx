import { AppBar, Button, Theme, makeStyles, Box } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@paralogs/front-core";
import { MyLink } from "./MyLink";
import { authSelectors } from "../../selectors/authSelectors";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  leftSideLink: {
    display: "block",
    paddingLeft: "1rem",
  },
}));

export const NavBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  return (
    <AppBar position="static" className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <MyLink to="/" className={classes.leftSideLink}>
            <Box display="flex" alignItems="center">
              <HomeIcon /> <p> Paralogs</p>
            </Box>
          </MyLink>
          {isAuthenticated && (
            <>
              <MyLink to="/wings" className={classes.leftSideLink}>
                My Wings
              </MyLink>
              <MyLink to="/flights" className={classes.leftSideLink}>
                My Flights
              </MyLink>
            </>
          )}
        </Box>
        {isAuthenticated ? (
          <Box display="flex" alignItems="center">
            <MyLink to="/account">
              <PersonIcon />
            </MyLink>
            <Button color="inherit" onClick={() => dispatch(authActions.logoutRequested())}>
              Logout
            </Button>
          </Box>
        ) : (
          <MyLink to="login">
            <Button color="inherit">Login</Button>
          </MyLink>
        )}
      </Box>
    </AppBar>
  );
};
