import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

interface InputTextFieldProps {
  name: string;
  label: string;
  type?: string;
  className?: string;
}

export const InputTextField: React.FC<InputTextFieldProps> = ({
  label,
  name,
  type,
  className,
}) => {
  const [field, { touched, error }] = useField({ name });

  return (
    <TextField
      margin="normal"
      fullWidth
      id={name}
      label={label}
      name={name}
      type={type}
      className={className}
      {...field}
      error={touched && error != null}
      helperText={touched && error}
    />
  );
};
