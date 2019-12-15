import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import { Wing, WingId, UserId } from "@paralogs/shared";

import { wingsActions } from "../../../core-logic/useCases/wings/wings.actions";
import { RootState } from "../../../core-logic/reduxStore";
import { CenteredModal } from "../commun/CenteredModal";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
  },
  field: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export const AddWingModal: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const close = () => dispatch(wingsActions.hideAddWingForm());
  const isOpen = useSelector(({ wings }: RootState) => wings.isAddWingFormVisible);
  const initialValues: Wing = {
    id: WingId.create(),
    brand: "",
    model: "",
    flightTimePriorToOwn: 0,
    ownerFrom: new Date().toUTCString(),
    userId: UserId.create(), // should be erased by backend, TODO find a way not to give it
  };
  return (
    <CenteredModal open={isOpen} onClose={close}>
      <Formik
        initialValues={initialValues}
        onSubmit={async wingValues => {
          await dispatch(wingsActions.addWingRequest(wingValues));
          close();
        }}
        validationSchema={Yup.object().shape<Pick<Wing, "model" | "brand">>({
          brand: Yup.string().required(),
          model: Yup.string().required(),
        })}
      >
        {({ values, handleChange, submitForm }) => (
          <Form>
            <Typography variant="h6" className={classes.title} color="primary">
              Adding a wing
            </Typography>
            <TextField
              className={classes.field}
              variant="standard"
              margin="normal"
              required
              name="brand"
              label="Brand"
              onChange={handleChange}
              value={values.brand}
            />
            <TextField
              className={classes.field}
              variant="standard"
              margin="normal"
              required
              name="model"
              label="Model"
              onChange={handleChange}
              value={values.model}
            />
            <TextField
              className={classes.field}
              type="date"
              margin="normal"
              name="ownerFrom"
              label="Owner from date"
              onChange={handleChange}
              value={format(new Date(values.ownerFrom), "yyyy-MM-dd")}
            />
            {/* <TextField
              className={classes.field}
              type="date"
              margin="normal"
              name="ownerUntil"
              label="Owner until date"
              onChange={handleChange}
              value={values.ownerUntil}
            /> */}
            <TextField
              className={classes.field}
              label="Flight time of the wing when owned"
              variant="standard"
              type="number"
              name="flightTimePriorToOwn"
              onChange={handleChange}
              value={values.flightTimePriorToOwn}
            />
            <Button
              color="primary"
              className={classes.button}
              variant="contained"
              component="button"
              type="submit"
              onClick={submitForm}
            >
              <SaveIcon /> Add this wing
            </Button>
          </Form>
        )}
      </Formik>
    </CenteredModal>
  );
};
