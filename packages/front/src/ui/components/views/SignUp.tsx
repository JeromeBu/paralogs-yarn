import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { currentUserActions } from "../../../core-logic/useCases/currentUser/currentUser.actions";
import { MyLink } from "../commun/MyLink";
import { RootState } from "../../../core-logic/reduxStore";
import { DisplayError } from "../commun/DisplayError";

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

interface EmailAndPassword {
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.currentUser);
  const classes = useStyles();

  const handleSubmit = (values: EmailAndPassword) => {
    dispatch(currentUserActions.signUpRequest(values));
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
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string(),
          password: Yup.string(),
        })}
      >
        {({ values, handleChange }) => (
          <Form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
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
              id="password"
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