import {
  Avatar,
  Container,
  Grid,
  makeStyles,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { SignUpParams, signUpSchema } from "@paralogs/shared";
import { authActions } from "@paralogs/front-core";

import { MyLink } from "../commun/MyLink";
import { DisplayError } from "../commun/DisplayError";
import { authSelectors } from "../../selectors/authSelectors";
import { InputTextField } from "../commun/form/InputTextField";
import { UIButton } from "../commun/UIButton";

const useStyles = makeStyles(theme => ({
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
  error: { color: theme.palette.error.main },
}));

export const SignUpView: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(authSelectors.error);
  const classes = useStyles();
  const theme = useTheme();

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
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={theme.spacing(1)}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Up</Typography>
        <DisplayError errorMessage={error} />
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={signUpSchema}
        >
          <Form>
            <InputTextField name="firstName" label="First name" />
            <InputTextField name="lastName" label="Last name" />
            <InputTextField name="email" label="Email address" />
            <InputTextField name="password" label="password" type="password" />
            <UIButton type="submit" className={classes.submit}>
              Sign Up
            </UIButton>
            <Grid container justify="flex-end">
              <Grid item>
                <MyLink to="/login" variant="body2">
                  You already have an acount ? Login here !
                </MyLink>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};
