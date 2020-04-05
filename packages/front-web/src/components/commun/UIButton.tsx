import React from "react";
import { Button } from "@material-ui/core";

export const UIButton: React.FC<{ type?: "submit"; className?: string }> = ({
  children,
  type,
  className,
}) => (
  <Button type={type} className={className} fullWidth variant="contained" color="primary">
    {children}
  </Button>
);
