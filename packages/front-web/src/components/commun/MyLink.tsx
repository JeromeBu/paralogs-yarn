import React from "react";
import { Link as MuiLink } from "@material-ui/core";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Variant } from "@material-ui/core/styles/createTypography";

const Link1 = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

export const MyLink: React.FC<{ to: string; variant?: Variant }> = ({
  children,
  to,
  variant,
}) => (
  <MuiLink color="inherit" component={Link1} to={to} variant={variant}>
    {children}
  </MuiLink>
);
