import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { uuid, AddFlightDTO } from "@paralogs/shared";

import { CenteredModal } from "../commun/CenteredModal";
import { wingsActions } from "../../../core-logic/useCases/wings/wings.actions";
import { RootState } from "../../../core-logic/reduxStore";

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

interface AddFlightModalProps {
  isOpen: boolean;
  close: () => void;
  handleSubmit: (flight: AddFlightDTO) => Promise<void>;
}

export const AddFlightModal: React.FC<AddFlightModalProps> = ({
  handleSubmit,
  close,
  isOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wings = useSelector((state: RootState) => state.wings.data);

  const initialValues: AddFlightDTO = {
    id: uuid(),
    site: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "14:30",
    duration: 60,
    wingId: wings[0]?.id,
  };

  return (
    <CenteredModal open={isOpen} onClose={close}>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          await handleSubmit(values);
          close();
        }}
      >
        {({ values, handleChange, submitForm }) => {
          return (
            <Form>
              <Typography variant="h6" className={classes.title} color="primary">
                Adding a flight
              </Typography>
              <TextField
                className={classes.field}
                margin="normal"
                required
                name="site"
                label="Site"
                onChange={handleChange}
                value={values.site}
              />
              <div>
                <Select
                  className={classes.field}
                  value={values.wingId}
                  name="wing"
                  onChange={e => {
                    if (e.target.value === "addNewWing") {
                      dispatch(wingsActions.showAddWingForm());
                      return;
                    }
                    handleChange(e);
                  }}
                >
                  <MenuItem value="addNewWing" key="addNewWing">
                    <AddIcon /> Add new wing
                  </MenuItem>
                  {wings.map(wing => (
                    <MenuItem value={wing.id} key={wing.id}>
                      {wing.brand} {wing.model}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <TextField
                className={classes.field}
                type="date"
                margin="normal"
                name="date"
                label="Date"
                onChange={handleChange}
                value={values.date}
              />
              <TextField
                className={classes.field}
                label="TakeOf time"
                type="time"
                name="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                onChange={handleChange}
                value={values.time}
              />
              <TextField
                className={classes.field}
                label="FlightDTO duration"
                type="number"
                name="duration"
                onChange={handleChange}
                value={values.duration}
              />
              <Button
                color="primary"
                className={classes.button}
                variant="contained"
                onClick={submitForm}
                component="button"
                type="submit"
              >
                <SaveIcon /> Add this flight
              </Button>
            </Form>
          );
        }}
      </Formik>
    </CenteredModal>
  );
};
