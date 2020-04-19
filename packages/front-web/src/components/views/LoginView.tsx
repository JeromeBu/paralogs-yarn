import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { LoginParams, loginSchema } from "@paralogs/shared";
import { authActions } from "@paralogs/front-core";
import { MyLink } from "../commun/MyLink";
import { DisplayError } from "../commun/DisplayError";
import { authSelectors } from "../../selectors/authSelectors";
import { InputTextField } from "../commun/form/InputTextField";
import { useRedirectOnAuthentication } from "../../hooks/useRedirectOnAuthentication";

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
}));

export const LoginView: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(authSelectors.error);
  const classes = useStyles();
  useRedirectOnAuthentication();

  const initialValues: LoginParams = {
    email: "",
    password: "",
  };

  return (
    <Container maxWidth="xs" className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Log in</Typography>
      <DisplayError errorMessage={error} />
      <Formik
        validationSchema={loginSchema}
        initialValues={initialValues}
        onSubmit={async values => {
          dispatch(authActions.loginRequest(values));
        }}
      >
        <Form className={classes.form}>
          <InputTextField label="Email address" name="email" />
          <InputTextField label="Password" name="password" type="password" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <MyLink to="#" variant="body2">
                Forgot password?
              </MyLink>
            </Grid>
            <Grid item>
              <MyLink to="/signup" variant="body2">
                Don't have an account? Sign Up
              </MyLink>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};
