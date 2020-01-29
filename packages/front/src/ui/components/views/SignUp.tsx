import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { SignUpParams, signUpSchema } from "@paralogs/shared";
import { authActions } from "../../../core-logic/useCases/auth/auth.actions";
import { MyLink } from "../commun/MyLink";
import { DisplayError } from "../commun/DisplayError";
import { authSelectors } from "../../selectors/authSelectors";

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(authSelectors.error);
  const classes = useStyles();

  const handleSubmit = (values: SignUpParams) => {
    dispatch(authActions.signUpRequest(values));
  };

  const initialValues: SignUpParams = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  return (
    <Container maxWidth="xs" className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Sign Up</Typography>
      <DisplayError error={error} />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={signUpSchema}
      >
        {({ values, handleChange }) => (
          <Form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <MyLink to="/login" variant="body2">
                  You already have an acount ? Login here !
                </MyLink>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
