import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

interface InputTextFieldProps {
  name: string;
  label: string;
  type?: string;
}

export const InputTextField: React.FC<InputTextFieldProps> = ({ label, name, type }) => {
  const [field, { touched, error }] = useField({ name });

  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id={name}
      label={label}
      name={name}
      type={type}
      {...field}
      error={touched && error != null}
      helperText={touched && error}
    />
  );
};
